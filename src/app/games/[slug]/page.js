// app/games/[slug]/page.js
import Image from 'next/image';
import Link from 'next/link'; // <--- IMPORTANTE: Importar o Link
import { getGameBySlug } from '@/api';
import markdownToHtml from '@/api/markdown';

async function getGame(slug) {
  const game = getGameBySlug(slug);
  const content = await markdownToHtml(game.content || '');
  return {
    ...game,
    content,
  };
}

export default async function GameDetails({ params }) {
  const { slug } = await params;
  const game = await getGame(slug);

  return (
    <div className="container mx-auto px-12 py-10 max-w-7xl space-y-12 text-white">
      
      {/* --- BOTÃO GO BACK ADICIONADO AQUI --- */}
      <div className="mb-6">
        <Link
          href="/" // Mude isto para onde você quer voltar (ex: "/" para a home, ou "/games")
          className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-4 px-8 rounded-lg shadow-md transition-all inline-block"
        >
          ← Go back
        </Link>
      </div>
      {/* ------------------------------------- */}

      <h1 className="text-5xl font-extrabold text-center">{game.title}</h1>

      {/* Cover Image */}
      {/* Corrigi o "rounded 2xl" para "rounded-2xl" (com hífen) */}
      <div className="mx-auto rounded-2xl overflow-hidden" style={{ width: '67%' }}>
        <div className="relative w-full" style={{ paddingTop: '56.25%' /* 16:9 aspect ratio */ }}>
          <Image
            className="object-cover"
            src={game.coverImage}
            alt={game.title}
            fill
            sizes="(max-width: 768px) 100vw, 75vw"
            priority
          />
        </div>
      </div>

      {/* Description */}
      <p className="text-lg leading-relaxed max-w-6xl mx-auto text-center">{game.description}</p>

      {/* Download Links */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-12">
        {game.appStoreId && (
          <a
            href={`https://apps.apple.com/app/${game.appStoreId}`}
            className="bg-green-600 hover:bg-green-800 text-white font-bold py-4 px-8 rounded-lg shadow-md transition-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download on App Store
          </a>
        )}
        {game.playStoreId && (
          <a
            href={`https://play.google.com/store/apps/details?id=${game.playStoreId}`}
            className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-4 px-8 rounded-lg shadow-md transition-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download on Play Store
          </a>
        )}
        {game.itchIoId && (
          <a
            href={`https://2dberries.itch.io/${game.itchIoId}`}
            className="bg-pink-600 hover:bg-pink-800 text-white font-bold py-4 px-8 rounded-lg shadow-md transition-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            Play on Itch.io
          </a>
        )}
      </div>

      {/* Content Section */}
      <section className="space-y-6 max-w-6xl">
        <article
          className="prose prose-invert prose-lg mx-auto w-full max-w-6xl"
          dangerouslySetInnerHTML={{ __html: game.content }}
        />
      </section>

      {/* What You Will Learn */}
      <section className="space-y-4">
        <h2 className="text-3xl font-semibold">What You Will Learn</h2>
        <ul className="list-disc pl-6 space-y-2 mx-auto">
          {game.wsl.map((item, index) => (
            <li key={index} className="text-lg leading-relaxed">
              {item}
            </li>
          ))}
        </ul>
      </section>

      {/* Requirements */}
      <section className="space-y-4">
        <h2 className="text-3xl font-semibold">Requirements</h2>
        <ul className="list-disc pl-6 space-y-2 mx-auto">
          {game.requirements.map((req, index) => (
            <li key={index} className="text-lg leading-relaxed">
              {req}
            </li>
          ))}
        </ul>
      </section>

      {/* Target Group */}
      <section className="space-y-4">
        <h2 className="text-3xl font-semibold">Target Group</h2>
        <ul className="list-disc pl-6 space-y-2 mx-auto">
          {game.targetGroup.map((group, index) => (
            <li key={index} className="text-lg leading-relaxed">
              {group}
            </li>
          ))}
        </ul>
      </section>

      {/* Gameplay Video */}
      <section className="space-y-4">
        <h2 className="text-3xl font-semibold">Gameplay Video</h2>
        <p>Check out the gameplay video on YouTube:</p>
        <a
          href={game.video}
          className="block text-blue-400 hover:text-blue-200 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Watch Gameplay Video
        </a>
      </section>
      <section className="space-y-4">
        <h2 className="text-3xl font-semibold">Support</h2>
        <a href="mailto:2dberries@gmail.com"
          className="block text-blue-400 hover:text-blue-200 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Send Email
        </a>
      </section>
      <section className="space-y-4">
        <a
          href={`/privacy-policy/${game.slug}`}
          className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-4 px-8 rounded-lg shadow-md transition-all"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </a>
      </section>
      {/* Gallery */}
      <section className="space-y-4">
        <div className="grid grid-cols-5 gap-6 max-w-7xl mx-auto">
          {game.images.map((image, index) => (
            <div key={index} className="relative w-full aspect-[9/20] shadow-lg rounded-lg overflow-hidden">
              <Image
                className="object-cover"
                src={image}
                alt={`${game.title} Screenshot ${index + 1}`}
                fill
                sizes="100vw"
              />
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
