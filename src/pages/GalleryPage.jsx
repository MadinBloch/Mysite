import { Link, useSearchParams } from 'react-router-dom'
import { FiArrowUpRight } from 'react-icons/fi'
import PhotoDeck from '../components/PhotoDeck'
import PhotoGrid from '../components/PhotoGrid'
import { certificatePhotos, hackathonPhotos, meetupPhotos, workshopPhotos } from '../data/photos'

const albums = [
  {
    id: 'hackathon',
    name: 'Hackathon',
    title: 'New India Vibrant Hackathon',
    description: 'From the regional round to the Grand Finale at PDEU in 2023.',
    photos: hackathonPhotos,
    recordings: [
      ['Regional round recording', 'https://www.youtube.com/watch?v=N-U6c92QPeA'],
      ['Hackathon project walkthrough', 'https://www.youtube.com/watch?v=yLy_fBdOT7M'],
    ],
  },
  {
    id: 'workshop',
    name: 'Workshop',
    title: 'Git & Docker at Dr. Subhash University',
    description: 'A practical session with BCA and MCA students in Junagadh, August 2026.',
    photos: workshopPhotos,
  },
  {
    id: 'certificates',
    name: 'Achievements',
    title: 'Certificates & achievements',
    description: 'Certificates from the hackathon, backend training and national-level cricket.',
    photos: certificatePhotos,
    grid: true,
  },
  {
    id: 'meetups',
    name: 'Meetups',
    title: 'Laravel meetups',
    description: 'Meeting other PHP and Laravel developers and comparing how we build and deploy our applications.',
    photos: meetupPhotos,
    grid: true,
  },
]

export default function GalleryPage() {
  const [params] = useSearchParams()
  const album = albums.find(({ id }) => id === params.get('album')) || albums[0]

  return (
    <div className="portfolio-shell destination-page">
      <h1 className="destination-title">Photo <em>archive.</em></h1>
      <nav className="album-menu" aria-label="Photo albums">
        {albums.map(({ id, name, photos }) => (
          <Link key={id} to={'/gallery?album=' + id} aria-current={album.id === id ? 'page' : undefined}>
            {name} <span>{photos.length}</span>
          </Link>
        ))}
      </nav>
      <section id={album.id} className="album-content" key={album.id} aria-labelledby="album-title">
        <div className="album-copy">
          <h2 id="album-title">{album.title}</h2>
          <p>{album.description}</p>
          {album.recordings?.map(([label, href]) => (
            <a key={href} href={href} target="_blank" rel="noreferrer" className="story-link">{label}<FiArrowUpRight aria-hidden="true" /></a>
          ))}
        </div>
        {album.grid ? (
          <PhotoGrid photos={album.photos} className="grid gap-4 min-[480px]:grid-cols-2" />
        ) : (
          <PhotoDeck photos={album.photos} label={album.name + ' photos'} priority />
        )}
      </section>
    </div>
  )
}
