import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { fetchRegistrations, updateRegistrationStatus } from '@/api/registrations';

const RegistrationsPage = () => {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState('');

  const { data: registrations = [], isLoading } = useQuery(
    ['registrations', statusFilter],
    () => fetchRegistrations(undefined, statusFilter || undefined),
  );

  const mutation = useMutation(updateRegistrationStatus, {
    onSuccess: () => {
      queryClient.invalidateQueries(['registrations', statusFilter]);
    },
  });

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Inscriptions</h1>
          <p className="text-sm text-muted-foreground">Gérez les demandes d'inscription en attente de validation.</p>
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          <div>
            <Label htmlFor="status">Filtrer par statut</Label>
            <select
              id="status"
              title="Filtrer par statut"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Tous</option>
              <option value="PENDING">En attente</option>
              <option value="APPROVED">Approuvées</option>
              <option value="REJECTED">Rejetées</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
        <table className="min-w-full divide-y divide-border text-left text-sm">
          <thead className="bg-muted/10">
            <tr>
              <th className="px-4 py-3 font-semibold">Élève</th>
              <th className="px-4 py-3 font-semibold">Parent</th>
              <th className="px-4 py-3 font-semibold">École</th>
              <th className="px-4 py-3 font-semibold">Statut</th>
              <th className="px-4 py-3 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-background">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-muted-foreground">
                  Chargement des inscriptions...
                </td>
              </tr>
            ) : registrations.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-sm text-muted-foreground">
                  Aucune inscription trouvée.
                </td>
              </tr>
            ) : (
              registrations.map((registration: any) => (
                <tr key={registration.id}>
                  <td className="px-4 py-4">
                    <div className="font-medium">{registration.firstName} {registration.lastName}</div>
                    <div className="text-muted-foreground text-xs">{registration.gender} • {new Date(registration.birthDate).toLocaleDateString()}</div>
                  </td>
                  <td className="px-4 py-4">
                    <div>{registration.parentName}</div>
                    <div className="text-muted-foreground text-xs">{registration.parentEmail}</div>
                  </td>
                  <td className="px-4 py-4">{registration.school?.name || registration.schoolId}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                      registration.status === 'PENDING'
                        ? 'bg-amber-100 text-amber-700'
                        : registration.status === 'APPROVED'
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {registration.status === 'PENDING' ? 'En attente' : registration.status === 'APPROVED' ? 'Approuvée' : 'Rejetée'}
                    </span>
                  </td>
                  <td className="px-4 py-4 space-x-2">
                    {registration.status === 'PENDING' ? (
                      <>
                        <Button
                          size="sm"
                          onClick={() => mutation.mutate({ id: registration.id, payload: { status: 'APPROVED' } })}
                        >
                          Approuver
                        </Button>
                        <Button
                          size="sm"
                          variant="secondary"
                          onClick={() => mutation.mutate({ id: registration.id, payload: { status: 'REJECTED' } })}
                        >
                          Rejeter
                        </Button>
                      </>
                    ) : (
                      <span className="text-muted-foreground text-xs">Aucune action</span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RegistrationsPage;
