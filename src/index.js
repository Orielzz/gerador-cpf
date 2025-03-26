const DIGITOS_SEM_VERIFICADOR = 9;
const DIGITOS_CPF_COM_VERIFICADOR = 11;
// multiplicar 1 2 3 4 5 6 7 8 9
// por       10 9 8 7 6 5 4 3 2 
// multiplica ppelos valores 
// soma tudo e tira o modulo com 11
//         se o resto for 0 ou  1 digito eh 0
//         senao digitio é 11- resto
// adiciona o DV ao cpf 0  1 2 3 4 5 6 7 8 9 
//                     11 10 9 8 7 6 5 4 3 2
// multiplica ppelos valores 
// soma tudo e tira o modulo com 11
//         se o resto for 0 ou  1 digito eh 0
//         senao digitio é 11- resto
export function gerarDV(cpf){
    checarCpf(cpf,9);
    //passo 1
    let soma = 0;
    for(let i = 0 ; i < DIGITOS_SEM_VERIFICADOR ; i++){
        soma += Number(cpf[i]) * (10 - i);
    }
    let dv1 = soma % 11;
     dv1 = dv1 < 2 ? 0 : (11 - dv1);
       //passo 2
       cpf += dv1.toString();
        soma = 0;
       for(let i = 0 ; i < DIGITOS_SEM_VERIFICADOR + 1; i++){
           soma += Number(cpf[i]) * (11 - i);
       }
       let dv2 = soma % 11;
       dv2 = dv2 < 2 ? 0 : (11 - dv2);
       return dv1.toString() + dv2.toString();
}

function checarCpf(cpf,tamanho){
    if(typeof cpf !== 'string'){
        throw new Error('CPF must be a string');
    }
    if(cpf.length !== tamanho ){
        throw new Error(`Cpf deve ter ${tamanho} digitos`);
    }
    if(!/[0-9]{9,11}$/.test(cpf)){
        throw new Error('Cpf deve ser numerico');
    }
}

export function validarCpf(cpf){
    checarCpf(cpf, DIGITOS_CPF_COM_VERIFICADOR);
    const cpfSemDV = cpf.substring(0, DIGITOS_SEM_VERIFICADOR);
    return gerarDV(cpfSemDV) === cpf.substring(cpfSemDV.length);
}


function gerarDigitos(qtd){
    let digitos = '';
    for(let i = 0 ; i < qtd ; i++){
        digitos += Math.floor(Math.random() * 10);
    }
    return digitos;
}

export function gerarCPF(){
    const cpfSemDV = gerarDigitos(DIGITOS_SEM_VERIFICADOR);
    return cpfSemDV + gerarDV(cpfSemDV);
}
