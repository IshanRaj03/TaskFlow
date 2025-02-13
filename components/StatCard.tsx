export default function StatCard({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <div className="text-center space-y-2">
      <h4 className="text-4xl font-bold  bg-gradient-to-l from-blue-100 to-green-600 bg-clip-text text-transparent dark:text-green-400">
        {number}
      </h4>
      <p className="text-gray-600 dark:text-gray-300">{label}</p>
    </div>
  );
}
