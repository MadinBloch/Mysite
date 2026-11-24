import { photoSources } from '../photoRenditions'

function frame(id, width, height, title, alt, position = 'center') {
  return { id, width, height, title, alt, position, ...photoSources(id, width) }
}

export const frames = {
  team: frame('hackathon-team', 880, 660, 'Grand Finale team', 'The hackathon team together on the lawn at PDEU', 'center 30%'),
  regional: frame('hackathon-regional', 880, 660, 'Regional round', 'The team gathered around their laptops at the regional round'),
  presentation: frame('hackathon-presentation', 880, 660, 'Presenting the solution', 'Students demonstrate the application to judges around a laptop'),
  certificates: frame('hackathon-certificates', 880, 239, 'Team certificates', 'Hackathon teammates at the certificate presentation'),
  workshop: frame('git-docker', 800, 390, 'Git & Docker workshop', 'Students watch the Git and Docker session at Dr. Subhash University'),
  classroom: frame('classroom', 800, 200, 'In the classroom', 'BCA and MCA students seated in the university lecture hall'),
  workshopGroup: frame('workshop-certificate', 1280, 720, 'After the workshop', 'Madin with the university workshop hosts'),
  meetup: frame('laravel-group', 880, 660, 'Laravel meetup', 'Ahmedabad Laravel meetup attendees gathered for a group photo', 'center 58%'),
  developers: frame('laravel-meetup', 880, 1174, 'Meeting developers', 'Two developers at a Laravel meetup', 'center 43%'),
  working: frame('image6', 880, 1320, 'Team working session', 'Hackathon teammates coding together around a table', 'center 56%'),
  finalist: frame('image8', 880, 426, 'Hackathon 2023', 'Madin at the hackathon certificate presentation', '35% center'),
}

export function EventPhoto({ photo, sizes = '100vw', className = '' }) {
  return <img className={className} src={photo.small} srcSet={photo.cardSrcSet} sizes={'auto, ' + sizes}
    width={photo.width} height={photo.height} alt={photo.alt || photo.title + (photo.caption ? ': ' + photo.caption : '')} style={{ objectPosition: photo.position }}
    loading="lazy" decoding="async" />
}
