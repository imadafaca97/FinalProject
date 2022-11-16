/* eslint-disable jsx-a11y/alt-text */
import client from './5696057.png'
import user from './my-client-2.png'
import { useOptions } from './useOptions'
export const Options = () => {
    const {handleClient, handleUser, handleLogOut} = useOptions()
    return (
        <div style={{width: '400px', display: 'flex', flexDirection: 'column', marginLeft: '32%', marginTop: '15%'}} >
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <img src={client} onClick={handleClient} style={{width: '50%'}}/>
                <img src={user} onClick={handleUser} style={{width: '50%'}} />
            </div>

            <button type="submit" className="button" onClick={handleLogOut}>Cerrar sesion</button>
        </div>
    )
}