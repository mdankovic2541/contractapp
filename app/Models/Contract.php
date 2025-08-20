<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Contract extends Model
{
    protected $fillable = ['client_id', 'title', 'start_date', 'duration_months', 'comments'];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }
}
