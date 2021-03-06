const electrumclient = require('..')
const Client = electrumclient.Client
const ElectrumProtocol = electrumclient.v4.ElectrumProtocol

const proc = async (ecl) => {
  const tx1 = await ecl.blockchain_transaction_get('f91d0a8a78462bc59398f2c5d7a84fcff491c26ba54c4833478b202796c8aafd')
  console.log(tx1)
  const tx2 = await ecl.blockchain_transaction_getParsed('f91d0a8a78462bc59398f2c5d7a84fcff491c26ba54c4833478b202796c8aafd')
  console.log(JSON.stringify(tx2, null, 2))
}

const main = async () => {
  // autogenerate client name
  const myname = [ElectrumProtocol.libname, ElectrumProtocol.hash].join('-')
  console.log(myname)

  // initialize
  const ecl = new ElectrumProtocol(new Client(995, 'btc.smsys.me', 'tls'))

  // wait a connection
  await ecl.client.connect()

  try {
    // negotiation protocol
    const res = await ecl.server_version(myname)
    console.log(res)
  } catch (e) {
    // negotiation error
    await ecl.client.close()
    console.log(e)
    return
  }

  try {
    await proc(ecl)
  } catch (e) {
    console.log(e)
  }
  await ecl.client.close()
}
main().catch(console.log)
