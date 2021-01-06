<?php

namespace App\Http\Controllers;

use App\Http\Validation\PictureValidation;
use App\Models\Like;
use App\Models\Picture;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class PictureController extends Controller
{
    public function search(Request $request){
        $param = $request->input('search');

        if($param){
            $pictures = Picture::where('title', 'like', '%' . $param . '%')->get();
        }else{
            $pictures = Picture::all();
        }

        return response()->json($pictures);
    }

    public function show($id){
        $picture = Picture::find($id);
        if(!$picture){
            return response()->json(['message'=> 'ressource Not Found'], 403);
        }

        return response()->json($picture);
    }


    public function store(Request $request, PictureValidation $validation){

        //return response()->json(Auth::user());

        $validator = Validator::make($request->all(),$validation->rules(),$validation->message());

        if($validator->fails()){
            return response()->json(['errors'=>$validator->errors()],401);
        }

        $fullFileName = $request->file('image')->getClientOriginalName();
        $fileName = pathinfo($fullFileName, PATHINFO_FILENAME);
        $extension = $request->file('image')->getClientOriginalExtension();
        $file = $fileName.'_'.time().'.'.$extension;

        $request->file('image')->storeAs('public/pictures', $file);


        $picture = Picture::create([
            'image' => $file,
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'user_id' => Auth::user()->id
        ]);

        return response()->json($picture);
    }

    public function checkLike($id){
        $picture = Picture::find($id);
        if(Auth::user()){
            $like = Like::where('picture_id',$picture->id)->where('user_id', Auth::user()->id)->first();

            if($like) return response()->json(true);
        }

        return response()->json(false);
    }

    public function handleLike($id){
        $picture = Picture::find($id);

        $like = Like::where('picture_id',$picture->id)->where('user_id', Auth::user()->id)->first();

        if($like){
            $like->delete();
            return response()->json(['success'=>'Picture Unliked']);
        }

        Like::create([
            'picture_id' => $picture->id,
            'user_id' => Auth::user()->id
        ]);
         return response()->json(['success'=>'Picture Liked']);
    }
}
