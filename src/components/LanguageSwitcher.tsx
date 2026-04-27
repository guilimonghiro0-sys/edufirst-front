import { useTranslation } from 'react-i18next';

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div className="fixed top-4 right-4 z-50 flex gap-2 bg-white p-2 rounded shadow">
      <button onClick={() => i18n.changeLanguage('fr')} className="px-2 py-1 text-sm">🇫🇷 FR</button>
      <button onClick={() => i18n.changeLanguage('en')} className="px-2 py-1 text-sm">🇬🇧 EN</button>
      <button onClick={() => i18n.changeLanguage('es')} className="px-2 py-1 text-sm">🇪🇸 ES</button>
    </div>
  );
}