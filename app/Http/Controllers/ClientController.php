<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    //Get all clients
    public function index()
    {
        return Client::all();
    }

    //Add new client
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string',
            'email' => 'nullable|email',
        ]);

        $client = Client::create($data);

        return response()->json($client, 201);
    }

    //Get single client with contracts
    public function show(Client $client)
    {
        return $client->load('contracts');
    }   
}
