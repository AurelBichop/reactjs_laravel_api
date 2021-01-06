<?php

namespace App\Http\Controllers;

use App\Http\Validation\LoginValidation;
use App\Http\Validation\RegisterValidation;
use App\Models\User;
use Illuminate\Http\Request;

use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;


class AuthenticationController extends Controller
{
    public function register(Request $request, RegisterValidation $registerValidation)
    {
        $validator = Validator::make($request->all(),$registerValidation->rules(),$registerValidation->message());

        if($validator->fails()){
            return response()->json(['errors'=>$validator->errors()],401);
        }

        $user = User::create([
            'email'=> $request->input('email'),
            'name'=> $request->input('name'),
            'password'=> bcrypt($request->input('password')),
            'api_token'=> Str::random(60),
        ]);

        return response()->json($user);
    }

    public function login(Request $request, LoginValidation $loginValidation)
    {

        $validator = Validator::make($request->all(),$loginValidation->rules(),$loginValidation->message());

        if($validator->fails()){
            return response()->json(['errors'=>$validator->errors()],401);
        }

        if(Auth::attempt(['email'=>$request->input('email'), 'password' => $request->input('password')])){
            $user = User::where('email', $request->input('email'))->firstOrFail();
            return response()->json($user);
        }else{
            return response()->json(['errors'=>'bad credentials'],401);
        }
    }
}
