<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Order;

class ExpirePendingOrders extends Command
{
    protected $signature = 'orders:expire-pending {--minutes=5 : Minutes to consider pending as expired}';
    protected $description = 'Mark pending orders older than N minutes as failed';

    public function handle(): int
    {
        $minutes = (int) $this->option('minutes');
        $cutoff = now()->subMinutes($minutes);
        $count = Order::where('status', 'pending')
            ->where(function ($q) use ($cutoff) {
                $q->whereNotNull('expires_at')->where('expires_at', '<', now())
                  ->orWhere(function ($qq) use ($cutoff) { $qq->whereNull('expires_at')->where('created_at', '<', $cutoff); });
            })
            ->update(['status' => 'failed']);

        $this->info("Expired {$count} pending orders older than {$minutes} minutes.");
        return Command::SUCCESS;
    }
}
