interface InsightBadgeProps {
  label: string;
}

export function InsightBadge({ label }: InsightBadgeProps) {
  const getBadgeStyle = (text: string) => {
    const lower = text.toLowerCase();
    if (lower.includes('excellent') || lower.includes('high')) {
      return 'bg-green-100 text-green-800 border-green-200';
    }
    if (lower.includes('good') || lower.includes('favourite') || lower.includes('recommended')) {
      return 'bg-blue-100 text-blue-800 border-blue-200';
    }
    if (lower.includes('average') || lower.includes('medium')) {
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
    if (lower.includes('improvement') || lower.includes('low')) {
      return 'bg-red-100 text-red-800 border-red-200';
    }
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getBadgeStyle(label)}`}>
      {label}
    </span>
  );
}
