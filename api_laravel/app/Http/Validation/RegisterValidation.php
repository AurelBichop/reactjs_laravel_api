<?php
namespace App\Http\Validation;


class RegisterValidation{
    public function rules(){
        return[
            'name' => ['required','string', 'max:150','min:3'],
            'email' => ['required','string', 'email', 'max:150','min:3','unique:users'],
            'password' => ['required','string', 'min:8'],
            'confirm_password' => ['required','same:password']
        ];
    }

    public function message(){
        return[
            'name.required' => 'vous devez spécifier votre nom',
            'email.required' => 'vous devez spécifier votre email',
            'email.unique' => 'Cet email est déja utilisé',
            'password.min' => 'mot de passe trop court min 8 caracteres',
            'confirm_password.same' => 'Vos mots de passes doivent être identique',
        ];
    }
}
