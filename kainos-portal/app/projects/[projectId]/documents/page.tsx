import { DEMO_MODE } from '@/lib/config';
import { globaltechDocuments } from '@/lib/mock';
import { Card } from '@/components/canvas/Card';
import { notFound } from 'next/navigation';

interface DocumentsPageProps {
  params: Promise<{ projectId: string }>;
}

export default async function DocumentsPage({ params }: DocumentsPageProps) {
  const { projectId } = await params;
  if (!DEMO_MODE) notFound();
  if (projectId !== 'globaltech-hcm-emea') notFound();

  return (
    <div className="max-w-6xl mx-auto">
      <Card title="Project documents">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead>
              <tr className="border-b border-[var(--canvas-licorice-200)] text-[var(--canvas-licorice-400)] text-xs uppercase tracking-wide">
                <th className="pb-2 pr-6 font-medium">Document</th>
                <th className="pb-2 pr-6 font-medium">Type</th>
                <th className="pb-2 pr-6 font-medium">Uploaded</th>
                <th className="pb-2 pr-6 font-medium">By</th>
                <th className="pb-2 font-medium">Link</th>
              </tr>
            </thead>
            <tbody>
              {globaltechDocuments.map((doc) => (
                <tr key={doc.id} className="border-b border-[var(--canvas-licorice-200)] text-[var(--canvas-licorice-600)]">
                  <td className="py-3 pr-6 font-medium">{doc.name}</td>
                  <td className="py-3 pr-6">
                    <span className="text-xs bg-[var(--canvas-licorice-200)] text-[var(--canvas-licorice-500)] px-2 py-0.5 rounded-full">
                      {doc.type}
                    </span>
                  </td>
                  <td className="py-3 pr-6 text-[var(--canvas-licorice-400)]">{doc.uploadedDate}</td>
                  <td className="py-3 pr-6 text-[var(--canvas-licorice-400)]">{doc.uploadedBy}</td>
                  <td className="py-3">
                    <a href={doc.url} className="text-[var(--canvas-blueberry-400)] hover:underline text-xs">
                      View →
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
