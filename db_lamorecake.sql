-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 17 Sep 2025 pada 13.54
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_lamorecake`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `carts`
--

CREATE TABLE `carts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `carts`
--

INSERT INTO `carts` (`id`, `user_id`, `product_id`, `quantity`, `created_at`, `updated_at`) VALUES
(12, 2, 1, 1, '2025-09-16 14:50:20', '2025-09-16 17:04:08');

-- --------------------------------------------------------

--
-- Struktur dari tabel `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `nama` varchar(255) NOT NULL,
  `deskripsi` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `categories`
--

INSERT INTO `categories` (`id`, `nama`, `deskripsi`, `created_at`, `updated_at`) VALUES
(1, 'adad', 'adada', '2025-09-16 06:24:04', '2025-09-16 06:24:04');

-- --------------------------------------------------------

--
-- Struktur dari tabel `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `galleries`
--

CREATE TABLE `galleries` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `type` enum('product','activity') NOT NULL DEFAULT 'product',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `galleries`
--

INSERT INTO `galleries` (`id`, `image_url`, `caption`, `type`, `created_at`, `updated_at`) VALUES
(1, 'https://via.placeholder.com/640x480.png/0077aa?text=cakes+consectetur', 'Officiis sapiente accusamus enim doloremque nihil quaerat.', 'product', '2025-09-16 05:53:22', '2025-09-16 05:53:22'),
(2, 'https://via.placeholder.com/640x480.png/00aacc?text=cakes+ut', 'Molestias atque explicabo similique.', 'product', '2025-09-16 05:53:22', '2025-09-16 05:53:22'),
(3, 'https://via.placeholder.com/640x480.png/00ffbb?text=cakes+est', 'Nostrum perferendis id officiis doloremque.', 'product', '2025-09-16 05:53:22', '2025-09-16 05:53:22'),
(4, 'https://via.placeholder.com/640x480.png/0099ff?text=cakes+voluptates', 'Et aut aut ab adipisci nulla.', 'product', '2025-09-16 05:53:22', '2025-09-16 05:53:22'),
(5, 'https://via.placeholder.com/640x480.png/008899?text=cakes+quisquam', 'Consectetur est doloremque molestiae amet vel sint.', 'product', '2025-09-16 05:53:22', '2025-09-16 05:53:22'),
(6, 'https://via.placeholder.com/640x480.png/009911?text=cakes+magnam', 'Fuga similique laudantium nihil ab dolorem quia.', 'product', '2025-09-16 05:53:22', '2025-09-16 05:53:22');

-- --------------------------------------------------------

--
-- Struktur dari tabel `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_06_16_131434_create_products_table', 1),
(5, '2025_06_16_131521_create_carts_table', 1),
(6, '2025_06_16_131610_create_orders_table', 1),
(7, '2025_06_16_131704_create_order_items_table', 1),
(8, '2025_06_16_131742_create_payments_table', 1),
(9, '2025_06_16_131828_create_galleries_table', 1),
(10, '2025_06_16_132900_update_products_image_column', 1),
(11, '2025_08_02_115647_add_category_to_products_table', 1),
(12, '2025_08_02_123330_update_payments_table_for_midtrans', 1),
(13, '2025_08_02_123811_add_paid_status_to_orders_table', 1),
(14, '2025_08_05_083541_add_kategori_to_products_table', 1),
(15, '2025_08_10_090338_create_categories_table', 1),
(16, '2025_08_10_090447_add_kategori_id_to_products_table', 1),
(17, '2025_09_09_140730_add_postal_code_to_users_table', 1),
(18, '2025_09_16_000001_add_soft_deletes_to_products_table', 1),
(19, '2025_09_16_000002_add_expires_at_to_products_table', 1),
(20, '2025_09_16_130426_add_deleted_at_to_products_table', 1),
(21, '2025_09_16_200000_create_pending_payments_table', 2),
(22, '2025_09_16_200100_add_midtrans_order_id_to_orders_table', 3),
(23, '2025_09_17_000200_add_expires_at_to_orders_table', 4);

-- --------------------------------------------------------

--
-- Struktur dari tabel `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` int(11) NOT NULL,
  `midtrans_order_id` varchar(255) DEFAULT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `address` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `midtrans_order_id`, `total_price`, `address`, `phone`, `status`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 2, NULL, 30000.00, 'Jl. Merdeka No.1', '08123456789', 'delivered', NULL, '2025-09-16 05:53:22', '2025-09-16 06:11:49'),
(2, 2, NULL, 20000.00, 'Denpasar Barat, Jalan Karangsari Blok i, No 15', '081246599808', 'delivered', NULL, '2025-09-16 06:10:55', '2025-09-16 06:11:44'),
(9, 2, NULL, 80000.00, 'Denpasar Barat, Jalan Karangsari Blok i, No 15', '081246599808', 'failed', NULL, '2025-09-16 14:09:25', '2025-09-16 14:19:35'),
(10, 2, NULL, 80000.00, 'Denpasar Barat, Jalan Karangsari Blok i, No 15', '081246599808', 'failed', NULL, '2025-09-16 14:09:50', '2025-09-16 14:20:11'),
(11, 2, NULL, 40000.00, 'Denpasar Barat, Jalan Karangsari Blok i, No 15', '081246599808', 'failed', NULL, '2025-09-16 14:10:59', '2025-09-16 14:19:35'),
(12, 2, NULL, 40000.00, 'Denpasar Barat, Jalan Karangsari Blok i, No 15', '081246599808', 'failed', NULL, '2025-09-16 14:11:30', '2025-09-16 14:20:11'),
(15, 1, NULL, 20000.00, 'Denpasar Timur, Jalan Karangsari Blok i, No 15', '1131133', 'delivered', NULL, '2025-09-16 14:29:15', '2025-09-16 14:32:54'),
(16, 1, NULL, 40000.00, 'Denpasar Timur, Jalan Karangsari Blok i, No 15', '1131133', 'processing', NULL, '2025-09-16 14:38:43', '2025-09-16 14:39:33'),
(17, 1, NULL, 60000.00, 'Denpasar Timur, Jalan Karangsari Blok i, No 15', '1131133', 'paid', NULL, '2025-09-16 14:40:11', '2025-09-16 14:40:40'),
(18, 2, NULL, 60000.00, 'Denpasar Barat, Jalan Karangsari Blok i, No 15', '081246599808', 'failed', NULL, '2025-09-16 14:44:22', '2025-09-16 14:50:04'),
(19, 2, NULL, 20000.00, 'Denpasar Barat, Jalan Karangsari Blok i, No 15', '081246599808', 'paid', NULL, '2025-09-16 14:50:27', '2025-09-16 14:59:36'),
(20, 2, 'ORDER-2-1758063433', 40000.00, 'Denpasar Barat, Jalan Karangsari Blok i, No 15', '081246599808', 'paid', '2025-09-16 15:02:14', '2025-09-16 14:57:14', '2025-09-16 14:59:43'),
(21, 1, 'ORDER-1-1758063614', 20000.00, 'Denpasar Timur, Jalan Karangsari Blok i, No 15', '1131133', 'paid', '2025-09-16 15:05:15', '2025-09-16 15:00:15', '2025-09-16 15:01:19'),
(22, 1, 'ORDER-1-1758064187', 40000.00, 'Denpasar Timur, Jalan Karangsari Blok i, No 15', '1131133', 'failed', '2025-09-16 15:14:48', '2025-09-16 15:09:48', '2025-09-16 15:23:20'),
(23, 1, 'ORDER-1-1758064290', 40000.00, 'Denpasar Timur, Jalan Karangsari Blok i, No 15', '1131133', 'failed', '2025-09-16 15:16:31', '2025-09-16 15:11:31', '2025-09-16 15:23:20'),
(24, 1, 'ORDER-1-1758065029', 60000.00, 'Denpasar Timur, Jalan Karangsari Blok i, No 15', '1131133', 'paid', '2025-09-16 15:28:50', '2025-09-16 15:23:50', '2025-09-16 15:26:02'),
(25, 1, 'ORDER-1-1758065031', 60000.00, 'Denpasar Timur, Jalan Karangsari Blok i, No 15', '1131133', 'paid', '2025-09-16 15:28:52', '2025-09-16 15:23:52', '2025-09-16 15:25:28'),
(26, 1, 'ORDER-1-1758065869', 40000.00, 'Denpasar Timur, Jalan Karangsari Blok i, No 15', '1131133', 'paid', '2025-09-16 15:42:50', '2025-09-16 15:37:50', '2025-09-16 15:38:25'),
(27, 1, 'ORDER-1-1758065959', 160000.00, 'Denpasar Timur, Jalan Karangsari Blok i, No 15', '1131133', 'delivered', '2025-09-16 15:44:20', '2025-09-16 15:39:20', '2025-09-16 15:44:04'),
(28, 1, 'ORDER-1-1758066273', 80000.00, 'Denpasar Timur, Jalan Karangsari Blok i, No 15', '1131133', 'paid', '2025-09-16 15:49:34', '2025-09-16 15:44:34', '2025-09-16 15:47:04'),
(29, 1, 'ORDER-1-1758066472', 500000.00, 'Denpasar Timur, Jalan Karangsari Blok i, No 15', '1131133', 'paid', '2025-09-16 15:52:53', '2025-09-16 15:47:53', '2025-09-16 15:48:14'),
(30, 1, 'ORDER-1-1758067300', 280000.00, 'Denpasar Timur, Jalan Karangsari Blok i, No 15', '1131133', 'paid', '2025-09-16 16:06:41', '2025-09-16 16:01:41', '2025-09-16 16:02:02'),
(31, 1, 'ORDER-1-1758067814', 320000.00, 'Denpasar Timur, Jalan Karangsari Blok i, No 15', '1131133', 'processing', '2025-09-16 16:15:15', '2025-09-16 16:10:15', '2025-09-16 16:11:53'),
(32, 1, 'ORDER-1-1758068430', 40000.00, 'Denpasar Timur, Jalan Karangsari Blok i, No 15', '1131133', 'processing', '2025-09-16 16:25:31', '2025-09-16 16:20:31', '2025-09-16 16:30:17'),
(33, 1, 'ORDER-1-1758069081', 40000.00, 'Denpasar Timur, Jalan Karangsari Blok i, No 15', '1131133', 'paid', '2025-09-16 16:36:22', '2025-09-16 16:31:22', '2025-09-16 16:31:51'),
(34, 1, 'ORDER-1-1758069297', 40000.00, 'Denpasar Timur, Jalan Karangsari Blok i, No 15', '1131133', 'paid', '2025-09-16 16:39:58', '2025-09-16 16:34:58', '2025-09-16 16:37:32'),
(35, 1, 'ORDER-1-1758070608', 460000.00, 'Denpasar Timur, Jalan Karangsari Blok i, No 15', '1131133', 'paid', '2025-09-16 17:01:50', '2025-09-16 16:56:50', '2025-09-16 16:57:04');

-- --------------------------------------------------------

--
-- Struktur dari tabel `order_items`
--

CREATE TABLE `order_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `order_items`
--

INSERT INTO `order_items` (`id`, `order_id`, `product_id`, `quantity`, `price`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, 15000, '2025-09-16 05:53:22', '2025-09-16 05:53:22'),
(2, 1, 2, 1, 20000, '2025-09-16 05:53:22', '2025-09-16 05:53:22'),
(3, 2, 2, 1, 20000, '2025-09-16 06:10:55', '2025-09-16 06:10:55'),
(4, 3, 1, 2, 20000, '2025-09-16 06:27:51', '2025-09-16 06:27:51'),
(5, 4, 1, 1, 20000, '2025-09-16 06:31:11', '2025-09-16 06:31:11'),
(6, 5, 1, 1, 20000, '2025-09-16 06:32:06', '2025-09-16 06:32:06'),
(7, 6, 1, 1, 20000, '2025-09-16 06:43:48', '2025-09-16 06:43:48'),
(8, 7, 1, 1, 20000, '2025-09-16 06:44:12', '2025-09-16 06:44:12'),
(9, 8, 1, 1, 20000, '2025-09-16 06:44:37', '2025-09-16 06:44:37'),
(10, 9, 1, 4, 20000, '2025-09-16 14:09:25', '2025-09-16 14:09:25'),
(11, 10, 1, 4, 20000, '2025-09-16 14:09:50', '2025-09-16 14:09:50'),
(12, 11, 1, 2, 20000, '2025-09-16 14:10:59', '2025-09-16 14:10:59'),
(13, 12, 1, 2, 20000, '2025-09-16 14:11:30', '2025-09-16 14:11:30'),
(14, 13, 1, 1, 20000, '2025-09-16 14:23:19', '2025-09-16 14:23:19'),
(15, 14, 1, 2, 20000, '2025-09-16 14:27:00', '2025-09-16 14:27:00'),
(16, 15, 1, 1, 20000, '2025-09-16 14:29:15', '2025-09-16 14:29:15'),
(17, 16, 1, 2, 20000, '2025-09-16 14:38:43', '2025-09-16 14:38:43'),
(18, 17, 1, 3, 20000, '2025-09-16 14:40:12', '2025-09-16 14:40:12'),
(19, 18, 1, 3, 20000, '2025-09-16 14:44:22', '2025-09-16 14:44:22'),
(20, 19, 1, 1, 20000, '2025-09-16 14:50:27', '2025-09-16 14:50:27'),
(21, 20, 1, 2, 20000, '2025-09-16 14:57:14', '2025-09-16 14:57:14'),
(22, 21, 1, 1, 20000, '2025-09-16 15:00:15', '2025-09-16 15:00:15'),
(23, 22, 1, 2, 20000, '2025-09-16 15:09:48', '2025-09-16 15:09:48'),
(24, 23, 1, 2, 20000, '2025-09-16 15:11:31', '2025-09-16 15:11:31'),
(25, 24, 1, 3, 20000, '2025-09-16 15:23:50', '2025-09-16 15:23:50'),
(26, 25, 1, 3, 20000, '2025-09-16 15:23:52', '2025-09-16 15:23:52'),
(27, 26, 1, 2, 20000, '2025-09-16 15:37:50', '2025-09-16 15:37:50'),
(28, 27, 2, 4, 40000, '2025-09-16 15:39:20', '2025-09-16 15:39:20'),
(29, 28, 2, 2, 40000, '2025-09-16 15:44:34', '2025-09-16 15:44:34'),
(30, 29, 1, 9, 20000, '2025-09-16 15:47:53', '2025-09-16 15:47:53'),
(31, 29, 2, 8, 40000, '2025-09-16 15:47:53', '2025-09-16 15:47:53'),
(32, 30, 2, 3, 40000, '2025-09-16 16:01:41', '2025-09-16 16:01:41'),
(33, 30, 1, 8, 20000, '2025-09-16 16:01:41', '2025-09-16 16:01:41'),
(34, 31, 2, 8, 40000, '2025-09-16 16:10:15', '2025-09-16 16:10:15'),
(35, 32, 2, 1, 40000, '2025-09-16 16:20:31', '2025-09-16 16:20:31'),
(36, 33, 2, 1, 40000, '2025-09-16 16:31:22', '2025-09-16 16:31:22'),
(37, 34, 2, 1, 40000, '2025-09-16 16:34:58', '2025-09-16 16:34:58'),
(38, 35, 1, 1, 20000, '2025-09-16 16:56:50', '2025-09-16 16:56:50'),
(39, 35, 2, 11, 40000, '2025-09-16 16:56:50', '2025-09-16 16:56:50');

-- --------------------------------------------------------

--
-- Struktur dari tabel `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Struktur dari tabel `payments`
--

CREATE TABLE `payments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `order_id` int(11) NOT NULL,
  `payment_type` varchar(255) DEFAULT NULL,
  `transaction_id` varchar(255) DEFAULT NULL,
  `order_id_midtrans` varchar(255) DEFAULT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  `gross_amount` decimal(10,2) DEFAULT NULL,
  `transaction_status` varchar(255) DEFAULT NULL,
  `fraud_status` varchar(255) DEFAULT NULL,
  `transaction_time` timestamp NULL DEFAULT NULL,
  `midtrans_response` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`midtrans_response`)),
  `verified_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `payments`
--

INSERT INTO `payments` (`id`, `order_id`, `payment_type`, `transaction_id`, `order_id_midtrans`, `payment_method`, `gross_amount`, `transaction_status`, `fraud_status`, `transaction_time`, `midtrans_response`, `verified_at`, `created_at`, `updated_at`) VALUES
(1, 2, 'snap', NULL, 'ORDER-2-1758031835', NULL, 20000.00, 'settlement', NULL, '2025-09-16 06:10:55', NULL, '2025-09-16 06:10:55', '2025-09-16 06:10:55', '2025-09-16 06:10:55'),
(2, 3, 'snap', NULL, 'ORDER-1-1758032852', NULL, 40000.00, 'settlement', NULL, '2025-09-16 06:27:51', NULL, '2025-09-16 06:27:51', '2025-09-16 06:27:51', '2025-09-16 06:27:51'),
(3, 4, 'snap', NULL, 'ORDER-1-1758033056', NULL, 20000.00, 'settlement', NULL, '2025-09-16 06:31:11', NULL, '2025-09-16 06:31:11', '2025-09-16 06:31:11', '2025-09-16 06:31:11'),
(4, 5, 'snap', NULL, 'ORDER-1-1758033107', NULL, 20000.00, 'settlement', NULL, '2025-09-16 06:32:06', NULL, '2025-09-16 06:32:06', '2025-09-16 06:32:06', '2025-09-16 06:32:06'),
(5, 8, 'snap', NULL, 'ORDER-2-1758033851', NULL, 20000.00, 'settlement', NULL, '2025-09-16 06:44:37', NULL, '2025-09-16 06:44:37', '2025-09-16 06:44:37', '2025-09-16 06:44:37'),
(6, 10, 'snap', NULL, 'ORDER-2-1758060564', NULL, 80000.00, 'settlement', NULL, '2025-09-16 14:09:50', NULL, '2025-09-16 14:09:50', '2025-09-16 14:09:50', '2025-09-16 14:09:50'),
(7, 12, 'snap', NULL, 'ORDER-2-1758060658', NULL, 40000.00, 'settlement', NULL, '2025-09-16 14:11:30', NULL, '2025-09-16 14:11:30', '2025-09-16 14:11:30', '2025-09-16 14:11:30'),
(8, 28, 'snap', 'a1b76388-e2b4-485f-8fb1-ce2651b46861', 'ORDER-1-1758066273', 'bank_transfer', 80000.00, 'settlement', 'accept', '2025-09-16 15:47:05', '{\"status_code\":\"200\",\"transaction_id\":\"a1b76388-e2b4-485f-8fb1-ce2651b46861\",\"custom_field1\":\"[{\\\"product_id\\\":2,\\\"name\\\":\\\"Ayam Kerapu\\\",\\\"category\\\":null,\\\"price\\\":40000,\\\"quantity\\\":2}]\",\"custom_field2\":\"1\",\"custom_field3\":\"Denpasar Timur, Jalan Karangsari Blok i, No 15 80237\",\"gross_amount\":\"80000.00\",\"currency\":\"IDR\",\"order_id\":\"ORDER-1-1758066273\",\"payment_type\":\"bank_transfer\",\"signature_key\":\"0ec1cc82fa781ea07b22e851cca087300b437df6d958b5beb6ad4179a6d8eb8bb186f81a03085a7cc3118e1ead5464a2ce42c70eb0d680f931aeb32085163ef8\",\"transaction_status\":\"settlement\",\"fraud_status\":\"accept\",\"status_message\":\"Success, transaction is found\",\"merchant_id\":\"G558882939\",\"va_numbers\":[{\"bank\":\"bni\",\"va_number\":\"9888293986286827\"}],\"payment_amounts\":[{\"amount\":\"80000.00\",\"paid_at\":\"2025-09-17 06:44:37\"}],\"transaction_time\":\"2025-09-17 06:44:37\",\"settlement_time\":\"2025-09-17 06:47:01\",\"expiry_time\":\"2025-09-18 06:44:37\"}', '2025-09-16 15:47:05', '2025-09-16 15:47:05', '2025-09-16 15:47:05'),
(9, 29, 'snap', '8e9b5768-7651-4e7e-a1d5-6906aad54818', 'ORDER-1-1758066472', 'bank_transfer', 500000.00, 'settlement', 'accept', '2025-09-16 15:48:14', '{\"status_code\":\"200\",\"transaction_id\":\"8e9b5768-7651-4e7e-a1d5-6906aad54818\",\"custom_field1\":\"[{\\\"product_id\\\":1,\\\"name\\\":\\\"Pie Belafo\\\",\\\"category\\\":null,\\\"price\\\":20000,\\\"quantity\\\":9},{\\\"product_id\\\":2,\\\"name\\\":\\\"Ayam Kerapu\\\",\\\"category\\\":null,\\\"price\\\":40000,\\\"quantity\\\":8}]\",\"custom_field2\":\"1\",\"custom_field3\":\"Denpasar Timur, Jalan Karangsari Blok i, No 15 80237\",\"gross_amount\":\"500000.00\",\"currency\":\"IDR\",\"order_id\":\"ORDER-1-1758066472\",\"payment_type\":\"bank_transfer\",\"signature_key\":\"f0cb35cab6697ea80df49b701122894b6f7a115b1cbf743fc4a7b8549ecca5b57b919e5c70b74f37530cb0244e3e908ec8c5d1fcfb4184852cda1034a04dbb63\",\"transaction_status\":\"settlement\",\"fraud_status\":\"accept\",\"status_message\":\"Success, transaction is found\",\"merchant_id\":\"G558882939\",\"va_numbers\":[{\"bank\":\"bni\",\"va_number\":\"9888293901326748\"}],\"payment_amounts\":[{\"amount\":\"500000.00\",\"paid_at\":\"2025-09-17 06:47:56\"}],\"transaction_time\":\"2025-09-17 06:47:56\",\"settlement_time\":\"2025-09-17 06:48:11\",\"expiry_time\":\"2025-09-18 06:47:56\"}', '2025-09-16 15:48:14', '2025-09-16 15:48:14', '2025-09-16 15:48:14'),
(10, 30, 'snap', 'aaac4f30-2292-4ee7-a03e-78a2958c2268', 'ORDER-1-1758067300', 'bank_transfer', 280000.00, 'settlement', 'accept', '2025-09-16 16:02:02', '{\"status_code\":\"200\",\"transaction_id\":\"aaac4f30-2292-4ee7-a03e-78a2958c2268\",\"custom_field1\":\"[{\\\"product_id\\\":2,\\\"name\\\":\\\"Ayam Kerapu\\\",\\\"category\\\":null,\\\"price\\\":40000,\\\"quantity\\\":3},{\\\"product_id\\\":1,\\\"name\\\":\\\"Pie Belafo\\\",\\\"category\\\":null,\\\"price\\\":20000,\\\"quantity\\\":8}]\",\"custom_field2\":\"1\",\"custom_field3\":\"Denpasar Timur, Jalan Karangsari Blok i, No 15 80237\",\"gross_amount\":\"280000.00\",\"currency\":\"IDR\",\"order_id\":\"ORDER-1-1758067300\",\"payment_type\":\"bank_transfer\",\"signature_key\":\"4c2bb10870c550c0aeae2a675b0e14c45055c0266dc096b2d9dc7d1e193550ad7a504d720c46dc5c436782a499c4ea225b7f85e847892b649237a0cefecf9ed9\",\"transaction_status\":\"settlement\",\"fraud_status\":\"accept\",\"status_message\":\"Success, transaction is found\",\"merchant_id\":\"G558882939\",\"va_numbers\":[{\"bank\":\"bni\",\"va_number\":\"9888293920778781\"}],\"payment_amounts\":[{\"amount\":\"280000.00\",\"paid_at\":\"2025-09-17 07:01:47\"}],\"transaction_time\":\"2025-09-17 07:01:47\",\"settlement_time\":\"2025-09-17 07:01:59\",\"expiry_time\":\"2025-09-18 07:01:47\"}', '2025-09-16 16:02:02', '2025-09-16 16:02:02', '2025-09-16 16:02:02'),
(11, 31, 'snap', '13b4a499-0a4b-4493-a724-020a45580d11', 'ORDER-1-1758067814', 'bank_transfer', 320000.00, 'settlement', 'accept', '2025-09-16 16:10:28', '{\"status_code\":\"200\",\"transaction_id\":\"13b4a499-0a4b-4493-a724-020a45580d11\",\"custom_field1\":\"[{\\\"product_id\\\":2,\\\"name\\\":\\\"Ayam Kerapu\\\",\\\"category\\\":null,\\\"price\\\":40000,\\\"quantity\\\":8}]\",\"custom_field2\":\"1\",\"custom_field3\":\"Denpasar Timur, Jalan Karangsari Blok i, No 15 80237\",\"gross_amount\":\"320000.00\",\"currency\":\"IDR\",\"order_id\":\"ORDER-1-1758067814\",\"payment_type\":\"bank_transfer\",\"signature_key\":\"28496be32ad736108fea97ceb7054a6e20e98d6a16ba1a58eae556bf26c4b26cde32fc5fc9151cd04dc0ae674ac00a704574d21eb295dab2660e1fd79ba11ca5\",\"transaction_status\":\"settlement\",\"fraud_status\":\"accept\",\"status_message\":\"Success, transaction is found\",\"merchant_id\":\"G558882939\",\"va_numbers\":[{\"bank\":\"bni\",\"va_number\":\"9888293979441986\"}],\"payment_amounts\":[{\"amount\":\"320000.00\",\"paid_at\":\"2025-09-17 07:10:19\"}],\"transaction_time\":\"2025-09-17 07:10:19\",\"settlement_time\":\"2025-09-17 07:10:25\",\"expiry_time\":\"2025-09-18 07:10:19\"}', '2025-09-16 16:10:28', '2025-09-16 16:10:28', '2025-09-16 16:10:28'),
(12, 32, 'snap', '67411f03-8360-48fb-a4f5-b7985293ee00', 'ORDER-1-1758068430', 'bank_transfer', 40000.00, 'settlement', 'accept', '2025-09-16 16:20:44', '{\"status_code\":\"200\",\"transaction_id\":\"67411f03-8360-48fb-a4f5-b7985293ee00\",\"custom_field1\":\"[{\\\"product_id\\\":2,\\\"name\\\":\\\"Ayam Kerapu\\\",\\\"category\\\":null,\\\"price\\\":40000,\\\"quantity\\\":1}]\",\"custom_field2\":\"1\",\"custom_field3\":\"Denpasar Timur, Jalan Karangsari Blok i, No 15 80237\",\"gross_amount\":\"40000.00\",\"currency\":\"IDR\",\"order_id\":\"ORDER-1-1758068430\",\"payment_type\":\"bank_transfer\",\"signature_key\":\"f1c2f35e452fcd2a4756d751972caafecdbb916bdc3a86275ce95b0804d469ad700de0556a135bdd30dad93bac391c402254d4bd59ee451134b18f2310a7bf67\",\"transaction_status\":\"settlement\",\"fraud_status\":\"accept\",\"status_message\":\"Success, transaction is found\",\"merchant_id\":\"G558882939\",\"va_numbers\":[{\"bank\":\"bni\",\"va_number\":\"9888293941412993\"}],\"payment_amounts\":[{\"amount\":\"40000.00\",\"paid_at\":\"2025-09-17 07:20:34\"}],\"transaction_time\":\"2025-09-17 07:20:34\",\"settlement_time\":\"2025-09-17 07:20:41\",\"expiry_time\":\"2025-09-18 07:20:34\"}', '2025-09-16 16:20:44', '2025-09-16 16:20:44', '2025-09-16 16:20:44'),
(13, 33, 'snap', 'd40324c6-116f-436e-8b2b-c2f33d7181b0', 'ORDER-1-1758069081', 'bank_transfer', 40000.00, 'settlement', 'accept', '2025-09-16 16:31:51', '{\"status_code\":\"200\",\"transaction_id\":\"d40324c6-116f-436e-8b2b-c2f33d7181b0\",\"custom_field1\":\"[{\\\"product_id\\\":2,\\\"name\\\":\\\"Ayam Kerapu\\\",\\\"category\\\":null,\\\"price\\\":40000,\\\"quantity\\\":1}]\",\"custom_field2\":\"1\",\"custom_field3\":\"Denpasar Timur, Jalan Karangsari Blok i, No 15 80237\",\"gross_amount\":\"40000.00\",\"currency\":\"IDR\",\"order_id\":\"ORDER-1-1758069081\",\"payment_type\":\"bank_transfer\",\"signature_key\":\"358f5e203c1d4b7c3c1342bfa8ed0e6c9fc71dd6a11bfdb72cc441d052eeb1c09069b2e5b61d188e4043a1c99290a56362a95dfe5c3af989d648ce8c1080fbd0\",\"transaction_status\":\"settlement\",\"fraud_status\":\"accept\",\"status_message\":\"Success, transaction is found\",\"merchant_id\":\"G558882939\",\"va_numbers\":[{\"bank\":\"bni\",\"va_number\":\"9888293901530071\"}],\"payment_amounts\":[{\"amount\":\"40000.00\",\"paid_at\":\"2025-09-17 07:31:25\"}],\"transaction_time\":\"2025-09-17 07:31:25\",\"settlement_time\":\"2025-09-17 07:31:48\",\"expiry_time\":\"2025-09-18 07:31:25\"}', '2025-09-16 16:31:51', '2025-09-16 16:31:51', '2025-09-16 16:31:51'),
(14, 34, 'snap', 'f7bc2c97-fb52-46f2-aa59-30fb4dc8a3fc', 'ORDER-1-1758069297', 'bank_transfer', 40000.00, 'settlement', 'accept', '2025-09-16 16:37:33', '{\"status_code\":\"200\",\"transaction_id\":\"f7bc2c97-fb52-46f2-aa59-30fb4dc8a3fc\",\"custom_field1\":\"[{\\\"product_id\\\":2,\\\"name\\\":\\\"Ayam Kerapu\\\",\\\"category\\\":null,\\\"price\\\":40000,\\\"quantity\\\":1}]\",\"custom_field2\":\"1\",\"custom_field3\":\"Denpasar Timur, Jalan Karangsari Blok i, No 15 80237\",\"gross_amount\":\"40000.00\",\"currency\":\"IDR\",\"order_id\":\"ORDER-1-1758069297\",\"payment_type\":\"bank_transfer\",\"signature_key\":\"68a3727e4dd403db6560b4aa0771a0db3f2ede198deb30cab0b641d81b080d5044e4809d0923239debfae0b6c6f95067414e343a28309fc2af33a54a79e477e4\",\"transaction_status\":\"settlement\",\"fraud_status\":\"accept\",\"status_message\":\"Success, transaction is found\",\"merchant_id\":\"G558882939\",\"va_numbers\":[{\"bank\":\"bni\",\"va_number\":\"9888293943159789\"}],\"payment_amounts\":[{\"amount\":\"40000.00\",\"paid_at\":\"2025-09-17 07:35:00\"}],\"transaction_time\":\"2025-09-17 07:35:00\",\"settlement_time\":\"2025-09-17 07:37:29\",\"expiry_time\":\"2025-09-18 07:35:00\"}', '2025-09-16 16:37:33', '2025-09-16 16:37:33', '2025-09-16 16:37:33'),
(15, 35, 'snap', '020f2734-1682-4699-83fd-04fb0611cfed', 'ORDER-1-1758070608', 'bank_transfer', 460000.00, 'settlement', 'accept', '2025-09-16 16:57:05', '{\"status_code\":\"200\",\"transaction_id\":\"020f2734-1682-4699-83fd-04fb0611cfed\",\"custom_field1\":\"[{\\\"product_id\\\":1,\\\"name\\\":\\\"Pie Belafo\\\",\\\"category\\\":null,\\\"price\\\":20000,\\\"quantity\\\":1},{\\\"product_id\\\":2,\\\"name\\\":\\\"Ayam Kerapu\\\",\\\"category\\\":null,\\\"price\\\":40000,\\\"quantity\\\":11}]\",\"custom_field2\":\"1\",\"custom_field3\":\"Denpasar Timur, Jalan Karangsari Blok i, No 15 80237\",\"gross_amount\":\"460000.00\",\"currency\":\"IDR\",\"order_id\":\"ORDER-1-1758070608\",\"payment_type\":\"bank_transfer\",\"signature_key\":\"f896de96fc35a2c8140eac2c7862bf4251e0e58384df8090ec42cd847bdc1be0538163f4abb67a9c9d6611d58e65ce79976d6916618ba4fabaf08136a642d9f6\",\"transaction_status\":\"settlement\",\"fraud_status\":\"accept\",\"status_message\":\"Success, transaction is found\",\"merchant_id\":\"G558882939\",\"va_numbers\":[{\"bank\":\"bni\",\"va_number\":\"9888293945679964\"}],\"payment_amounts\":[{\"amount\":\"460000.00\",\"paid_at\":\"2025-09-17 07:56:52\"}],\"transaction_time\":\"2025-09-17 07:56:52\",\"settlement_time\":\"2025-09-17 07:57:01\",\"expiry_time\":\"2025-09-18 07:56:52\"}', '2025-09-16 16:57:05', '2025-09-16 16:57:05', '2025-09-16 16:57:05');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pending_payments`
--

CREATE TABLE `pending_payments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `midtrans_order_id` varchar(255) NOT NULL,
  `redirect_url` text NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `pending_payments`
--

INSERT INTO `pending_payments` (`id`, `user_id`, `midtrans_order_id`, `redirect_url`, `amount`, `created_at`, `updated_at`) VALUES
(1, 1, 'ORDER-1-1758032801', 'https://app.sandbox.midtrans.com/snap/v4/redirection/96efd5c6-c5dd-4688-bd5e-ca849c03b251', 20000.00, '2025-09-16 06:26:42', '2025-09-16 06:26:42'),
(2, 1, 'ORDER-1-1758032834', 'https://app.sandbox.midtrans.com/snap/v4/redirection/8374d8ec-4784-40da-b352-219e959dcf0f', 20000.00, '2025-09-16 06:27:15', '2025-09-16 06:27:15'),
(5, 1, 'ORDER-1-1758033089', 'https://app.sandbox.midtrans.com/snap/v4/redirection/ef7c060b-9adc-498d-8638-ea94101b1ed8', 20000.00, '2025-09-16 06:31:31', '2025-09-16 06:31:31'),
(7, 2, 'ORDER-2-1758033827', 'https://app.sandbox.midtrans.com/snap/v4/redirection/71df8d42-8491-4802-9780-639b5b524914', 20000.00, '2025-09-16 06:43:48', '2025-09-16 06:43:48'),
(11, 2, 'ORDER-2-1758061398', 'https://app.sandbox.midtrans.com/snap/v4/redirection/b18d6b40-7d26-45ab-84c0-b627e64c3550', 20000.00, '2025-09-16 14:23:19', '2025-09-16 14:23:19'),
(12, 2, 'ORDER-2-1758061619', 'https://app.sandbox.midtrans.com/snap/v4/redirection/d5e5116e-05e1-4b28-81a2-67c109922cec', 40000.00, '2025-09-16 14:27:00', '2025-09-16 14:27:00'),
(13, 1, 'ORDER-1-1758061754', 'https://app.sandbox.midtrans.com/snap/v4/redirection/14539494-1986-4ef9-96dd-8b26ca40a742', 20000.00, '2025-09-16 14:29:15', '2025-09-16 14:29:15'),
(14, 1, 'ORDER-1-1758062322', 'https://app.sandbox.midtrans.com/snap/v4/redirection/2eceae59-9a2e-4d94-bc1f-323404d51eaa', 40000.00, '2025-09-16 14:38:43', '2025-09-16 14:38:43'),
(16, 2, 'ORDER-2-1758062660', 'https://app.sandbox.midtrans.com/snap/v4/redirection/b9b88340-b940-45c3-91bc-f9e758dddaf8', 60000.00, '2025-09-16 14:44:22', '2025-09-16 14:44:22');

-- --------------------------------------------------------

--
-- Struktur dari tabel `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `kategori` varchar(255) DEFAULT NULL,
  `category` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `image` text DEFAULT NULL,
  `expires_at` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `kategori_id` bigint(20) UNSIGNED DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `products`
--

INSERT INTO `products` (`id`, `name`, `kategori`, `category`, `description`, `price`, `stock`, `image`, `expires_at`, `created_at`, `updated_at`, `kategori_id`, `deleted_at`) VALUES
(1, 'Pie Belafo', NULL, NULL, NULL, 20000, 15, NULL, '2025-09-18', '2025-09-16 06:25:07', '2025-09-16 16:57:05', 1, NULL),
(2, 'Ayam Kerapu', NULL, NULL, NULL, 40000, 45, 'data:image/png;base64,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', '2025-09-26', '2025-09-16 15:39:02', '2025-09-16 16:57:05', 1, NULL);

-- --------------------------------------------------------

--
-- Struktur dari tabel `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('E7MCHwHdkVGX4QrFV47SkzVkm0unHKcv8Fdw7a6N', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36 Edg/140.0.0.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiTjlqZUpRajVhRnI2UjBVSEc2RzNSUlFIcndJY3JtNGV3WmdXWXpRTiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzA6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMC9wcm9kdWN0cyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjE7fQ==', 1758068371),
('eK7FBKnW1RdX63FYozLFh17SCkiz0nYgweQP8b40', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiWUo1NUhJYzdlU2ljUkRXSVh0NGFlc2c2WlFLanJmVVZWYkptMEVKRyI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1758073128);

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `role` enum('user','admin') NOT NULL DEFAULT 'user',
  `name` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `postal_code` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `role`, `name`, `phone`, `address`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `postal_code`) VALUES
(1, 'admin', 'Mbok Epik', '1131133', 'Denpasar Timur, Jalan Karangsari Blok i, No 15', 'admin@example.com', '2025-09-16 05:53:21', '$2y$12$3PJPM7FIDeK7bGRC0WfVpeyKcGfPpjUcmiCg8cI/QbA09sLKT/UPC', '5xWodb88Rpv6cWakAL4nQeTCG6cB7e4ZPqWOJ3akKL0cHgRNrH9BcRFIUvH7', '2025-09-16 05:53:21', '2025-09-16 16:42:20', '80237'),
(2, 'user', 'Mahesa', '081246599808', 'Denpasar Barat, Jalan Karangsari Blok i, No 15', 'customer@example.com', '2025-09-16 05:53:22', '$2y$12$N4/tLtv4uGWyXhCPIy/wReM6K.ZnIQ/kPmmb4SVhO0jwobVK1ohcC', 't2F30V35vYXHlA6vR4S7TbGv7And04LXcxASTsGSoChy1U8lBgLRwhAAzbI8', '2025-09-16 05:53:22', '2025-09-16 14:29:02', '80119');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indeks untuk tabel `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indeks untuk tabel `carts`
--
ALTER TABLE `carts`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `categories_nama_unique` (`nama`);

--
-- Indeks untuk tabel `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indeks untuk tabel `galleries`
--
ALTER TABLE `galleries`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indeks untuk tabel `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `orders_midtrans_order_id_unique` (`midtrans_order_id`);

--
-- Indeks untuk tabel `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indeks untuk tabel `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `payments_transaction_id_unique` (`transaction_id`);

--
-- Indeks untuk tabel `pending_payments`
--
ALTER TABLE `pending_payments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pending_payments_midtrans_order_id_unique` (`midtrans_order_id`),
  ADD KEY `pending_payments_user_id_index` (`user_id`);

--
-- Indeks untuk tabel `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_kategori_id_foreign` (`kategori_id`);

--
-- Indeks untuk tabel `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `carts`
--
ALTER TABLE `carts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT untuk tabel `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `galleries`
--
ALTER TABLE `galleries`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT untuk tabel `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT untuk tabel `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT untuk tabel `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT untuk tabel `payments`
--
ALTER TABLE `payments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT untuk tabel `pending_payments`
--
ALTER TABLE `pending_payments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT untuk tabel `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_kategori_id_foreign` FOREIGN KEY (`kategori_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
