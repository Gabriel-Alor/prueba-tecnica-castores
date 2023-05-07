<?php

namespace App\Http\Controllers;

use App\Models\Comentario;
use Illuminate\Http\Request;


class ComentarioController extends Controller
{
    public function store(Request $request)
    {
        $comentario = new Comentario;
        $comentario->idnota = $request->idnota;
        $comentario->idusuario_comentario = $request->idusuario_comentario;
        $comentario->comentario = $request->comentario;
        $comentario->save();

        return response()->json(['mensaje' => 'Comentario creado exitosamente'], 201);
    }
}
