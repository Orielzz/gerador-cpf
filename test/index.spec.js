import {describe,expect , it} from 'vitest';
import {gerarCPF, gerarDV, validarCpf} from '../src/index.js';

describe('Gerador de Dígito Verificador', () => {
    it('lança exceção se cpf nao for string', () => {
        expect(()=>{
            gerarDV(123456789);
        }).toThrow(/string/i);
    });

    it('Deve ter nove digitos numericos', () => {
        expect(()=>{
            gerarDV('12345678');
        }).toThrow(/9/i);
        expect(()=>{
            gerarDV('1234567890');
        }).toThrow(/9/i);
    });

    it('aceita apenas digitos numericos', ()=>{
        expect(()=>{
            gerarDV('12345678a');
        }).toThrow(/numerico/i);

        expect(()=>{
            gerarDV('123.456.7');
        }).toThrow(/numerico/i);
    });

    it('gera o DV corretamente',()=>{
        const resultado = gerarDV('954301270');
        expect(resultado).toBe('94');
    })
});

describe(validarCpf.name,()=>{
    it('lança exceção se cpf nao for string', () => {
        expect(()=>{
            validarCpf(123456789);
        }).toThrow(/string/i);
    });
    it('lança exceção se cpf nao tiver 11 digitos', () => {
        expect(()=>{
            validarCpf('123456789011');
        }).toThrow(/11/i);
    });
    it('lança exceção se cpf tiver caracteres invalidos', () => {
        expect(()=>{
            validarCpf('123.456.789');
        }).toThrow(/numerico/i);
    });
    it('valida o dv corretamente',()=>{
        const resultado = validarCpf('78225648030');
        expect(resultado).toBeTruthy();
    })
})

describe(gerarCPF.name,()=>{
    it('gera um cpf valido',()=>{
        const cpf = gerarCPF();
        expect(validarCpf(cpf)).toBeTruthy();
    })
})