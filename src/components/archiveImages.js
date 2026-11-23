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

// The archive keeps its original records and titles. Both grid and full-screen views use the reviewed photograph.
export function archiveImage(photo) {
  const event = eventFrames[photo.id]
  if (event) return { ...photo, src: event.src, printSrc: event.small, previewWidth: 360,
    width: event.width, height: event.height, position: event.position, alt: event.alt }
  const extra = extras[photo.id]
  if (!extra) return photo
  const [file, width, height, alt] = extra
  return { ...photo, src: '/photos/boarding/' + file + '.webp', printSrc: undefined,
    previewWidth: undefined, width, height, alt }
}
