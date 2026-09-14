import { HiCode } from 'react-icons/hi';
import { TECH_ICONS } from '../data/techIconMap';

export default function TechIcon({ name, size = 20, className = '' }) {
  const entry = TECH_ICONS[name];
  const IconComponent = entry?.icon ?? HiCode;
  return <IconComponent size={size} color={entry?.color} className={className} title={name} />;
}
