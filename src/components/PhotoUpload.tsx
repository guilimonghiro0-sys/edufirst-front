import React, { useState, useRef } from 'react';
import { Camera, Upload, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface PhotoUploadProps {
  onPhotoChange: (file: File | null) => void;
  currentPhoto?: string | null;
  label?: string;
  className?: string;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({
  onPhotoChange,
  currentPhoto,
  label = "Photo de profil",
  className = ""
}) => {
  const [preview, setPreview] = useState<string | null>(currentPhoto || null);
  const [isCapturing, setIsCapturing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('La taille du fichier ne doit pas dépasser 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreview(result);
        onPhotoChange(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCapturing(true);
      }
    } catch (error) {
      alert('Impossible d\'accéder à la caméra. Vérifiez les permissions.');
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCapturing(false);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');

      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0);

        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], 'photo-capture.jpg', { type: 'image/jpeg' });
            const previewUrl = canvas.toDataURL('image/jpeg');
            setPreview(previewUrl);
            onPhotoChange(file);
            stopCamera();
          }
        }, 'image/jpeg', 0.8);
      }
    }
  };

  const removePhoto = () => {
    setPreview(null);
    onPhotoChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <Label className="text-sm font-medium">{label}</Label>

      {/* Photo Preview */}
      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-32 h-32 rounded-full border-2 border-dashed border-muted-foreground/25 bg-muted/50 flex items-center justify-center overflow-hidden">
          {preview ? (
            <>
              <img
                src={preview}
                alt="Photo de profil"
                className="w-full h-full object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                onClick={removePhoto}
              >
                <X className="h-3 w-3" />
              </Button>
            </>
          ) : (
            <User className="w-12 h-12 text-muted-foreground" />
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2"
          >
            <Upload className="w-4 h-4" />
            Importer
          </Button>

          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={isCapturing ? stopCamera : startCamera}
            className="flex items-center gap-2"
          >
            <Camera className="w-4 h-4" />
            {isCapturing ? 'Annuler' : 'Capturer'}
          </Button>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Camera Interface */}
      {isCapturing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full rounded-lg"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                <Button onClick={capturePhoto} className="flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  Prendre la photo
                </Button>
                <Button variant="outline" onClick={stopCamera}>
                  Annuler
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Hidden canvas for photo capture */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default PhotoUpload;