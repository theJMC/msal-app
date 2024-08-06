import './App.css';
import { useGlobalState } from '../globalState';
import { useEffect, useState } from 'react';
import { useMsal, useAccount } from '@azure/msal-react';
import { callMsGraph } from '../graph';
import { InteractionStatus } from '@azure/msal-browser';
import LoadingSpinner from '../components/loadingSpinner';


function TableHead() {
  return <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
      <tr>
          <th scope="col" className="px-6 py-3">
              Key
          </th>
          <th scope="col" className="px-6 py-3">
              Value
          </th>
      </tr>
  </thead>
}


function TableRow({name, value}) {
  return <tr className="odd:bg-white even:bg-gray-50 border-b">
      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
          {name}
      </th>
      <td className="px-6 py-4">
          {value}
      </td>
  </tr>
}




export default function ProfileContent() {
    const [globalState, ] = useGlobalState()

    const { instance, accounts, inProgress } = useMsal();
    const account = useAccount(accounts[0] || {});
    const [graphData, setGraphData] = useState(null)
    const [loading, setLoading] = useState(true)
    
    useEffect(() => {
      document.title = `${globalState.meta.title} - Profile`
    })

    useEffect(() => {
      if (inProgress === InteractionStatus.None && accounts.length > 0) {
        if (account) {
          instance.acquireTokenSilent({
            scopes: ["User.Read"],
            account: account
          }).then((response) => {
            if (response) {
              callMsGraph(response.accessToken).then((result) =>{
                setGraphData(result)
                setLoading(false)
              })
            }
          })
        }
      }
    }, [instance, inProgress, loading, accounts, account])



    if (loading || inProgress === InteractionStatus.Login) {
      return <LoadingSpinner />
    } else if (graphData) {
      return <div className='App'>
      <p className='text-3xl font-bold'>Profile Page</p>
      <hr />
      <div className='relative overflow-x-auto pt-4'>
        <table className='w-80 mx-auto text-sm text-left rtl:text-right text-gray-500'>
          <TableHead />
          <tbody>
            <TableRow name={"Given Name"} value={graphData.givenName} />
            <TableRow name={"Display Name"} value={graphData.displayName} />
            <TableRow name={"Email"} value={graphData.mail} />
          </tbody>
        </table>
      </div>
    </div>
    }

  
}
