import '../styles/footer.css'

function Footer() {
    const adresse = "1, rue du Président-Wilson 54000 Nancy"
    const numero = "06.01.02.03.94"
    const email = "M2lorraine@ecole-ipssi.net"

    return (
        <footer>
            <div className='sitefooter'>
                <h4>
                    Plus d'informations :
                </h4>
                <li> Numéro de téléphone :{numero}</li>
                <li> Adresse :{adresse} </li>
                <li> E-mail :{email} </li>
            </div>
        </footer>
    );
}

export default Footer;