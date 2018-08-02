export default async function health() {
    return {
        message: 'API is healthy',
        time: Date.now()
    }
}
