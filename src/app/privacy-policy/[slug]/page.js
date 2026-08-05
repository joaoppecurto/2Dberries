import { getPrivacyPolicyBySlug } from '@/api';
import markdownToHtml from '@/api/markdown';
import Link from 'next/link'; // Não se esqueça de importar o Link!

async function getPolicy(slug) {
  const policy = getPrivacyPolicyBySlug(slug);
  const content = await markdownToHtml(policy.content || '');
  return {
    ...policy,
    content,
  };
}

export default async function PrivacyPolicyDetails({ params }) {
  const { slug } = await params;
  const policy = await getPolicy(slug);

  return (
    <div className="container mx-auto px-12 py-10 max-w-7xl space-y-12 text-green">
      {/* O botão de voltar fica aqui, fora do conteúdo principal */}
      <div className="mb-6">
        <Link
          href={`/games/${slug}`}
          className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-4 px-8 rounded-lg shadow-md transition-all inline-block"
        >
          ← Go back
        </Link>
      </div>

      <p>Last Updated: {policy.date}</p>
      <h1 className="text-5xl font-extrabold text-center">{policy.title}</h1>

      {/* Content Section */}
      <section className="space-y-6 max-w-6xl">
        <article
          className="prose prose-invert prose-lg mx-auto w-full max-w-6xl"
          dangerouslySetInnerHTML={{ __html: policy.content }}
        />
      </section>
    </div>
  );
}
