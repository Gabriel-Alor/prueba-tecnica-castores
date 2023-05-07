<?php

namespace App\Http\Controllers;

use App\Models\Nota;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class NotaController extends Controller
{
    public function verNotas()
    {
        $notas = Nota::with(['usuario', 'usuario.personal'])->get();
        return response()->json(['notas' => $notas]);
    }

    public function buscarNota($id){
        $nota = Nota::with(['usuario', 'usuario.personal'])->find($id);
        if (!$nota) {
            return response()->json(['message' => 'Nota no encontrado'], 404);
        }

        return response()->json($nota);
    }


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'idusuario' => 'required|numeric',
            'titulo' => 'required|string',
            'descripcion' => 'required|string',
            'imagen' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 400);
        }

        $nota = new Nota;
        $nota->idusuario = $request->idusuario;
        $nota->titulo = $request->titulo;
        $nota->descripcion = $request->descripcion;
        $nota->imagen = $request->imagen;

        $nota->save();

        return response()->json(['message' => 'Nota creada exitosamente'], 201);
    }
}
