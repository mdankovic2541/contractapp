<?php

namespace App\Http\Controllers;

use App\Models\Contract;
use Illuminate\Http\Request;

class ContractController extends Controller
{
    // Get all contracts (with or without client id filter)
    public function index(Request $request)
    {
        $query = Contract::with('client');

        if ($request->has('client_id')) {
            $query->where('client_id', $request->client_id);
        }

        return $query->get();
    }

    // Add new contract
    public function store(Request $request)
    {
        $data = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'title' => 'required|string',
            'start_date' => 'required|date',
            'duration_months' => 'required|integer|min:1',
            'comments' => 'nullable|string',
        ]);

        $contract = Contract::create($data);

        return response()->json($contract, 201);
    }

    // Get a single contract (with client)
    public function show(Contract $contract)
    {
        return $contract->load('client');
    }

    // Update contract
    public function update(Request $request, Contract $contract)
    {
        $data = $request->validate([
            'title' => 'required|string',
            'start_date' => 'required|date',
            'duration_months' => 'required|integer|min:1',
            'comments' => 'nullable|string',
        ]);

        $contract->update($data);

        return response()->json($contract);
    }

    // Delete contract
    public function destroy(Contract $contract)
    {
        $contract->delete();

        return response()->json(null, 204);
    }
}
