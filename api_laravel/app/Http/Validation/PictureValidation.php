<?php
namespace App\Http\Validation;


class PictureValidation{
    public function rules(){
        return[
            'title' => ['required','string','max:150'],
            'description' => ['required','max:250'],
            'image' => ['required','image']
        ];
    }

    public function message(){
        return[
            'title.required' => 'vous devez spécifier un titre',
            'description.required' => 'vous devez spécifier une déscription',
            'image.required' => 'vous devez spécifier une image',
            'image.image' => 'Votre format d\'image n\'est pas valide',
        ];
    }
}

