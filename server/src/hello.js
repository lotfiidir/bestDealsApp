export default async event => {
  // you can use ES7 with async/await and even TypeScript in your functions :)

  await new Promise(r => setTimeout(r, 50))

  return {
    data: {
      title: `${event.data.name}`
    }
  }
}