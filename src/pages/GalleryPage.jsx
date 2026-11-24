import { lazy, Suspense, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { FiFilm, FiGrid } from 'react-icons/fi'
import { archiveImage } from '../components/archiveImages'
import PhotoGrid from '../components/PhotoGrid'
import { certificatePhotos, hackathonPhotos, meetupPhotos, workshopPhotos } from '../data/photos'

const PhotoDeck = lazy(() => import('../components/PhotoDeck'))

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
  },
  {
    id: 'meetups',
    name: 'Meetups',
    title: 'Laravel meetups',
    description: 'Meeting other PHP and Laravel developers and comparing how we build and deploy our applications.',
    photos: meetupPhotos,
  },
].map(album => ({ ...album, photos: album.photos.map(archiveImage) }))

export default function GalleryPage() {
  const [params] = useSearchParams()
  const [slideshow, setSlideshow] = useState(false)
  const album = albums.find(({ id }) => id === params.get('album')) || albums[0]

  return (
    <div className="portfolio-shell destination-page archive-page">
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
            <a key={href} href={href} target="_blank" rel="noreferrer" className="journal-link">{label}</a>
          ))}
          <div className="album-view-switch" role="group" aria-label="Album layout">
            <button type="button" aria-pressed={!slideshow} onClick={() => setSlideshow(false)}><FiGrid aria-hidden="true" />All photos</button>
            <button type="button" aria-pressed={slideshow} onClick={() => setSlideshow(true)}><FiFilm aria-hidden="true" />Slideshow</button>
          </div>
        </div>
        <div className="album-collection">
          {slideshow
            ? <Suspense fallback={<p role="status">Loading slideshow…</p>}>
              <PhotoDeck photos={album.photos} label={album.name + ' photos'} priority />
            </Suspense>
            : <PhotoGrid photos={album.photos} />}
        </div>
      </section>
    </div>
  )
}
