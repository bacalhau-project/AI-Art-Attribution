import minimist from 'minimist'
import bluebird from 'bluebird'
import { getContract } from './utils'

const args = minimist(process.argv, {
  default:{
    contract: process.env.CONTRACT,
  },
})

async function main() {
  const {
    contract,
  } = await getContract(args.contract)
  const imageIDs = await contract.getImageIDs()
  const images = await bluebird.map(imageIDs, async (imageID) => {
    const image = await contract.getImage(imageID)
    return image
  })
  console.log(JSON.stringify(images, null, 4))
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
