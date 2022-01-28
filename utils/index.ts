export const playAudio = (path: string) => new Audio(path).play()

export const sendNotifications = (title: string, options: object) => new Notification(title, options);

export const splitValues = (value: number | string, padSize: number = 2) => `${value}`.padStart(padSize, '0').split('')

export const getRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min)
}

export const scrollToElement = (selector: string) => {
  const element: HTMLElement | null = document.querySelector(selector)
  const mg = window.matchMedia('(max-width: 639px)')

  if(element && mg.matches) {
    element.scrollIntoView({block: 'start', behavior: 'smooth' })
  }
}
