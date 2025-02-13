export default function StatCard({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <div className="text-center space-y-2">
      <h4 className="text-4xl font-bold text-green-600 dark:text-green-400">
        {number}
      </h4>
      <p className="text-gray-600 dark:text-gray-300">{label}</p>
    </div>
  );
}
