export const ipfsToHttp = (ipfsURI: string) => {
  return ipfsURI.replace('ipfs://', 'https://ipfs.io/ipfs/')
}
