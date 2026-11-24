import { photoSources } from '../photoRenditions'
import { frames } from './EventPhotos'

const extras = {
  presenting: ['workshop-presenting', 800, 419, 'Madin demonstrating Git and local setup at the university'],
  finale: ['finale-stage', 305, 760, 'Madin on stage at the hackathon Grand Finale'],
  'finale-certificate': ['finale-award', 880, 209, 'Heading of the Grand Finale participation certificate'],
  'regional-certificate': ['regional-award', 880, 239, 'Heading of the regional hackathon participation certificate'],
  'pw-skills': ['node-award', 880, 309, 'Heading of the PW Skills backend development certificate'],
  cricket: ['cricket', 820, 1160, 'National-level cricket recognition'],
}

const eventFrames = {
  'finale-team': frames.team, 'team-certificates': frames.certificates,
  presentation: frames.presentation, regional: frames.regional, working: frames.working,
  'git-docker': frames.workshop, classroom: frames.classroom, 'workshop-certificate': frames.workshopGroup,
  'meetup-group': frames.meetup, meetup: frames.developers,
}

export function archiveImage(photo) {
  const event = eventFrames[photo.id]
  if (event) {
    return { ...photo, src: event.src, printSrc: event.small, thumb: event.thumb, srcSet: event.srcSet, cardSrcSet: event.cardSrcSet,
      width: event.width, height: event.height, position: event.position, alt: event.alt }
  }

  const extra = extras[photo.id]
  if (!extra) return photo
  const [file, width, height, alt] = extra
  const sources = photoSources(file, width)
  return { ...photo, src: sources.src, srcSet: sources.srcSet, cardSrcSet: sources.cardSrcSet, printSrc: sources.small,
    thumb: sources.thumb, width, height, alt }
}
