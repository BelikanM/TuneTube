export default function AudioPlayer({ src }) {
  return (
    <audio controls className="w-full mt-4">
      <source src={src} type="audio/mpeg" />
      Votre navigateur ne supporte pas l'audio HTML5.
    </audio>
  )
}
