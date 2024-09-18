import { Qonversion } from 'qonversion-capacitor';

window.testEcho = () => {
    const inputValue = document.getElementById("echoInput").value;
    Qonversion.echo({ value: inputValue })
}
