-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- 主機： 127.0.0.1
-- 產生時間： 2020-08-01 13:45:37
-- 伺服器版本： 10.4.11-MariaDB
-- PHP 版本： 7.4.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 資料庫： `sharity`
--

-- --------------------------------------------------------

--
-- 資料表結構 `admin`
--

CREATE TABLE `admin` (
  `productID` varchar(255) NOT NULL,
  `cID` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `sellerID` varchar(255) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `date_added` datetime NOT NULL,
  `type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `admin`
--

INSERT INTO `admin` (`productID`, `cID`, `name`, `description`, `sellerID`, `price`, `date_added`, `type`) VALUES
('0018e162-ce82-4dbb-a95e-761a07302er5', 'c0702', 'Prave Mascara', 'PRAVE Sweet Mascara The longer the flop, the more bouncy all day.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '25', '2020-07-16 00:28:54', 'item'),
('0ee40f66-a439-4cf5-aa8a-8d7014c8ddd9', 'c1015', 'abc', '1233211234567', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '15', '2020-07-22 03:34:13', 'service');

-- --------------------------------------------------------

--
-- 資料表結構 `cart`
--

CREATE TABLE `cart` (
  `accountID` varchar(255) NOT NULL,
  `productID` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `date_added` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 傾印資料表的資料 `cart`
--

INSERT INTO `cart` (`accountID`, `productID`, `quantity`, `date_added`) VALUES
('86a9598b-01d8-4ccf-9590-d64f8d986a42', '023c9318-f0cc-40f6-8780-ea26b8c64045', 2, '2020-07-21 09:37:13'),
('86a9598b-01d8-4ccf-9590-d64f8d986a42', '1d204a2e-3d86-42a4-9ff8-5d54cb1588e9', 1, '2020-08-01 13:38:10'),
('86a9598b-01d8-4ccf-9590-d64f8d986a42', '3f1cfec9-f147-4593-bdf6-4be3386c0f11', -1, '2020-08-01 13:38:40');

-- --------------------------------------------------------

--
-- 資料表結構 `category`
--

CREATE TABLE `category` (
  `categoryID` varchar(255) NOT NULL,
  `cName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 傾印資料表的資料 `category`
--

INSERT INTO `category` (`categoryID`, `cName`) VALUES
('c0001', 'Electronics'),
('c0002', 'Video Gaming'),
('c0003', 'Photography'),
('c0004', 'Toys'),
('c0005', 'Fashion'),
('c0006', 'Accessories'),
('c0007', 'Cosmestics'),
('c0008', 'Automobiles'),
('c0009', 'Music'),
('c0010', 'Baby goods'),
('c0011', 'Health'),
('c0012', 'Crafts'),
('c0013', 'Sports'),
('c0014', 'Pet Supplies'),
('c0015', 'Idol Goods');

-- --------------------------------------------------------

--
-- 資料表結構 `comments`
--

CREATE TABLE `comments` (
  `commentID` varchar(255) NOT NULL,
  `accountID` varchar(255) NOT NULL,
  `productID` varchar(255) NOT NULL,
  `parent` varchar(255) DEFAULT NULL,
  `content` text NOT NULL,
  `date_added` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 傾印資料表的資料 `comments`
--

INSERT INTO `comments` (`commentID`, `accountID`, `productID`, `parent`, `content`, `date_added`) VALUES
('0952d21e-523f-4753-b242-91e195eac7ee', '2860c3bc-1891-4452-821c-e89fe8e2c668', '023c9318-f0cc-40f6-8780-ea26b8c64045', 'd61bfb3c-bef3-4cb2-b1ec-90215bd18152', '.', '2020-07-23 10:50:22'),
('19eef59e-07b1-43bf-8258-768a777335e4', '2860c3bc-1891-4452-821c-e89fe8e2c668', '023c9318-f0cc-40f6-8780-ea26b8c64045', 'NULL', 'very very good', '2020-07-23 10:45:47'),
('51baa566-aa20-4430-8132-40c8e7fd463a', '2860c3bc-1891-4452-821c-e89fe8e2c668', '023c9318-f0cc-40f6-8780-ea26b8c64045', '19eef59e-07b1-43bf-8258-768a777335e4', 'really?', '2020-07-23 10:46:06'),
('58576ac3-c0f3-492b-bf4b-11ce77caac54', '2860c3bc-1891-4452-821c-e89fe8e2c668', '023c9318-f0cc-40f6-8780-ea26b8c64045', 'd61bfb3c-bef3-4cb2-b1ec-90215bd18152', '.', '2020-07-23 10:50:22'),
('5b4759f6-141a-4935-b676-c04a47a09ff4', 'bb5d54b1-4522-4edb-97b4-70643af876e3', '1a5591a4-78ce-4878-be87-59cdfafe7da0', 'NULL', 'well play', '2020-07-15 15:05:20'),
('5f2d572e-213e-480b-b647-b9bc37107215', '2860c3bc-1891-4452-821c-e89fe8e2c668', '023c9318-f0cc-40f6-8780-ea26b8c64045', 'd61bfb3c-bef3-4cb2-b1ec-90215bd18152', '.', '2020-07-23 10:50:14'),
('82afb5db-7e59-4009-9987-1e806dfb5449', '2860c3bc-1891-4452-821c-e89fe8e2c668', '023c9318-f0cc-40f6-8780-ea26b8c64045', 'd61bfb3c-bef3-4cb2-b1ec-90215bd18152', '.', '2020-07-23 10:50:20'),
('876a93f4-660f-4200-a922-eb59d376f3e7', '2860c3bc-1891-4452-821c-e89fe8e2c668', '023c9318-f0cc-40f6-8780-ea26b8c64045', '19eef59e-07b1-43bf-8258-768a777335e4', 'really really?', '2020-07-23 10:47:13'),
('8c5c6242-030d-4578-910b-b6c35e43da40', '2860c3bc-1891-4452-821c-e89fe8e2c668', '023c9318-f0cc-40f6-8780-ea26b8c64045', 'd61bfb3c-bef3-4cb2-b1ec-90215bd18152', '.', '2020-07-23 10:50:21'),
('a562a6f2-cce9-4727-8001-4fe0f0ee6e36', '2860c3bc-1891-4452-821c-e89fe8e2c668', '023c9318-f0cc-40f6-8780-ea26b8c64045', 'd61bfb3c-bef3-4cb2-b1ec-90215bd18152', 'do not think so', '2020-07-23 10:48:28'),
('af5a1af3-ade7-407e-bf99-6eb92c9e0833', 'bb5d54b1-4522-4edb-97b4-70643af876e3', '0ee40f66-a439-4cf5-aa8a-8d7014c8ddd9', 'NULL', 'very good', '2020-07-15 08:51:10'),
('af5a1af3-ade7-407e-bf99-6eb92c9e0858', 'bb5d54b1-4522-4edb-97b4-70643af876e3', '0ee40f66-a439-4cf5-aa8a-8d7014c8ddd9', 'af5a1af3-ade7-407e-bf99-6eb92c9e0833', 'Not really good', '2020-07-15 18:12:58'),
('d5b4546d-e8a8-4240-9aa2-cbbd85d0130a', '2860c3bc-1891-4452-821c-e89fe8e2c668', '023c9318-f0cc-40f6-8780-ea26b8c64045', 'd61bfb3c-bef3-4cb2-b1ec-90215bd18152', '.', '2020-07-23 10:50:17'),
('d61bfb3c-bef3-4cb2-b1ec-90215bd18152', 'bb5d54b1-4522-4edb-97b4-70643af876e3', '023c9318-f0cc-40f6-8780-ea26b8c64045', 'NULL', 'not really good', '2020-07-15 15:04:50'),
('fd1cbc11-1b1f-4294-9a02-31d04a90296a', '2860c3bc-1891-4452-821c-e89fe8e2c668', '023c9318-f0cc-40f6-8780-ea26b8c64045', '19eef59e-07b1-43bf-8258-768a777335e4', 'ok fine', '2020-07-23 14:54:00');

-- --------------------------------------------------------

--
-- 資料表結構 `favourites`
--

CREATE TABLE `favourites` (
  `accountID` varchar(255) NOT NULL,
  `productID` varchar(255) NOT NULL,
  `date_added` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- 資料表結構 `following`
--

CREATE TABLE `following` (
  `accountID` varchar(255) NOT NULL,
  `followingID` varchar(255) NOT NULL,
  `date_added` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 傾印資料表的資料 `following`
--

INSERT INTO `following` (`accountID`, `followingID`, `date_added`) VALUES
('86a9598b-01d8-4ccf-9590-d64f8d986a42', 'bb5d54b1-4522-4edb-97b4-70643af876e3', '2020-07-21'),
('bb5d54b1-4522-4edb-97b4-70643af876e3', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '2020-07-15');

-- --------------------------------------------------------

--
-- 資料表結構 `item`
--

CREATE TABLE `item` (
  `itemID` varchar(255) NOT NULL,
  `cID` varchar(255) NOT NULL,
  `iName` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `sellerID` varchar(255) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `quantity` int(11) NOT NULL,
  `date_added` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 傾印資料表的資料 `item`
--

INSERT INTO `item` (`itemID`, `cID`, `iName`, `description`, `sellerID`, `price`, `quantity`, `date_added`) VALUES
('0018e162-ce82-4dbb-a95e-761a07302ee7', 'c0702', 'Prave Mascara', 'PRAVE Sweet Mascara The longer the flop, the more bouncy all day.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '138', 2, '2020-06-16 08:25:01'),
('023c9318-f0cc-40f6-8780-ea26b8c64045', 'c0704', 'LANEIGE Multi Deep-Clean Cleanser', 'LANEIGE Multi Deep Clean Cleanser. Containing plant-derived papain enzyme the Multi Deep Clean Cleanser by Laneige removes makeup, sun cream, and fine dust and takes care of dead skin cells. The cleanser also contains blueberry extract, an ingredient that makes the skin clean and bright.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '84', 0, '2020-06-16 08:28:55'),
('0c64728b-5288-4631-b142-68376c457d10', 'c1503', 'Preludio', 'CD', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '375', 6, '2020-06-16 08:41:11'),
('0edd80c8-240a-42a8-b164-b2a79a561519', 'c0203', 'Last of US Part 2', 'The Last of Us Part II takes place five years after the events of the first game and about 25 years after the outbreak of the Cordyceps Brain Infection began. Ellie, who is now 19 years old, will return as the main protagonist whom players will assume control of, as well as Joel in his mid-fifties.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '468', 9, '2020-06-16 08:01:45'),
('0f4c1120-60ad-4e97-b13f-1142e500d5d3', 'c0803', 'Porsche 718', 'The updated 718 models use a 2.0-litre turbo for base trims, good for a robust 300 horsepower and 280 lb-ft of torque and resultant 5.1-second sprint from standstill to 100km/h with its standard six-speed manual, or 4.9 seconds to 100km/h with the optional seven-speed dual-clutch automated PDK transmission, finalizing in a top speed of 275 km/h. When fitted with the automatic, both base cars offer an available Sport Chrono Package that reduces zero to 100km/h times to just 4.7 seconds. ', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '750000', 8, '2020-06-16 08:30:57'),
('106c9e82-b99c-47a5-ac3b-1d3466dbb344', 'c0203', 'BAYONETTA', 'Bayonetta is an action-adventure hack and slash video game developed by PlatinumGames and published by Sega. ...\r\nBayonetta takes place in Vigrid, a fictional city in Europe. ...\r\nDevelopment of the game was started in January 2007, with Hideki Kamiya being the game\'s director.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '298', 6, '2020-06-16 08:02:22'),
('1a5591a4-78ce-4878-be87-59cdfafe7da0', 'c0402', 'LEGO Bugatti Chiron', 'This LEGO® Technic™ model is designed to provide an immersive and rewarding building experience. This set includes 3,599 pieces. Suitable for ages 16+. Bugatti Chiron measures over 5” (14cm) high, 22” (56cm) long and 12.5”(32cm) wide.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '2999', 6, '2020-06-16 08:08:43'),
('1d204a2e-3d86-42a4-9ff8-5d54cb1588e9', 'c0101', 'iPhone 11 Pro', 'The phone comes with a 5.80-inch touchscreen display with a resolution of 1125x2436 pixels at a pixel density of 458 pixels per inch (ppi). iPhone 11 Pro is powered by a hexa-core Apple A13 Bionic processor. It comes with 4GB of RAM. The iPhone 11 Pro runs iOS 13 and is powered by a 3046mAh non-removable battery.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '8599', 7, '2020-06-16 07:30:15'),
('1dded65f-e003-457c-8a08-b73b47a8e6a8', 'c0702', 'Dior SPF20PA', 'For a complexion budding with the bright, fresh perfection of springtime blossom, Diorsnow Compact Luminous Perfection Brightening Foundation now features an innovative smart CCC™ texture: Corrects Shadows and imperfections, Controls shine, and ensures a long-lasting Comfort.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '600', 7, '2020-06-16 08:23:51'),
('1eecd07d-bbae-4daf-a3f3-af88ddabd2e1', 'c1001', 'Four wheels baby car', 'This type of baby carrots include the full coverage in order to prevent the rain drop inside the car and make the baby sick. The 4 wheel also help the car move faster.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '1435', 9, '2020-06-16 08:08:44'),
('24ebcda5-cc72-444d-b15f-6ec4ebc1f817', 'c0103', 'Sony X80H', 'Great for TV shows. The Sony X800H can get bright and it handles reflections well enough in most average-lit rooms. 720p content, such as from a cable box, looks great, as does 1080p and 4k content. The viewing angles are very wide, so everyone in your family can sit around the TV to enjoy your favorite show.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '9180', 7, '2020-06-16 07:52:07'),
('284ffb3f-9ab1-4783-a27e-7052160c2b5b', 'c1502', 'KIS-MY-FT2', 'CD', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '200', 8, '2020-06-16 08:44:02'),
('29c237b0-7c0c-4d56-8a57-90407f568fe0', 'c0402', 'LEGO LP 560-4', '8169 Lamborghini Gallardo LP 560-4 was a 741 piece Racers set released in 2009 and is a 1:17 model of the car that can be changed into either a Coupe or Spyder.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '1899', 7, '2020-06-16 08:08:21'),
('2fc8bba2-11b2-4fc5-8d3d-0fe3c21d4c90', 'c1201', 'PVC Tube', 'This include the a radius of 1cm PVC Tube for the Handmade love to make their own PVC items.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '20', 7, '2020-06-16 08:28:42'),
('32d6397d-683b-4ff8-a68a-6fc0e209b7b1', 'c0106', 'Oculus Go', 'Search Results\r\nFeatured snippet from the web\r\nPut simply, it\'s a virtual reality headset designed for everyone. Oculus Go is the third headset from Oculus, and it\'s meant to exist between the phone-powered Samsung Gear VR and PC-powered Oculus Rift. ... But as a standalone system, meaning it doesn\'t need to connect to anything, Oculus Go offers something unique.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '1999', 7, '2020-06-16 07:58:52'),
('335fcf53-221e-4c19-92ef-a51692127911', 'c0504', 'Kawa SE JDI', 'Slip on the Nike Kawa SE JDI for plush comfort with Swoosh swag. These sandals are soft and flexible to help them recover after playtime or to get out the door fast. SLIDE INTO FUN WITH SWOOSH STYLE.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '199', 8, '2020-06-16 08:15:34'),
('3559d5ac-290e-47de-9cc6-26ace350c41a', 'c0102', 'ASUS ZenBook Duo', 'Take your creativity and productivity to the next level with the groundbreaking ASUS ZenBook Duo! Designed to give you the ultimate edge in workflow efficiency, the unique design features a full-width ASUS ScreenPad™ Plus that works seamlessly with the main display. It’s never been this easy to harness your full creative power.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '10480', 7, '2020-06-16 07:50:46'),
('358c66ff-b890-4f14-af18-8a3953aac40a', 'c0701', 'TOM FORD SPF45', 'With SPF45 protection and a refreshing cooling sensation, it\'s Soleil perfection in both flesh tone shades for a radiant, smooth natrual look and tone up shades for instant glow. Enriched with the Tom Ford Infusing Complex and pearl powders, skin is well-hydrated with radiant comfort.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '240', 8, '2020-06-16 08:24:15'),
('3aa3e409-04f8-4f0e-bfa7-1d8a432a7362', 'c1503', 'Pick Me Up Off The Floor', 'CD', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '176', 7, '2020-06-16 08:40:30'),
('3cad1139-4753-4055-bc61-4f4ceb2460b0', 'c1401', 'Leash', 'This leash is useful for the jogging with your pet and it is not easy to broken.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '159', 8, '2020-06-16 08:41:06'),
('3d637a81-5cb0-459e-90c1-df77a1438e4e', 'c0604', 'Ray-Ban RB4264 601/J0', 'Sunglasses Ray-Ban RB4264 601/J0 Polarized are part of the latest Ray-Ban collection carefully crafted for men. This elegant full-rim model reflects the latest trends in contemporary designer eyewear and its wayfarer shape makes Ray-Ban RB4264 the perfect choice especially for round, oval and heart-shaped faces.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '1600', 7, '2020-06-16 08:22:05'),
('3e4d2150-1c9e-428f-980f-1136ac31e9f8', 'c0501', 'NIKE AIR MAX 90 SP', 'The Nike Air Max 90 stays true to its OG roots with the iconic Waffle outsole, stitched overlays and classic TPU accents. Fresh colors give a modern look while Max Air cushioning adds comfort to your journey. Originally designed for performance running, the Max Air unit in the heel adds unbelievable cushioning.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '999', 8, '2020-06-16 08:11:34'),
('423b367b-2932-41d9-9792-42b65f1ff62c', 'c1401', 'Cat toys', 'This is a toy for cat to play and have fun.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '210', 8, '2020-06-16 08:39:44'),
('457f4b95-1ad7-4f65-8da3-7a224be6696e', 'c0103', 'Samsung UA43NU7100JXZK', 'Product Type LED. Series 7. Screen Size 75\" Resolution 3,840 x 2,160. Picture Engine UHD Engine. HDR (High Dynamic Range) 4K HDR10+ HDR 10+ Yes. Audio. Dolby Digital Plus Yes. Sound Output (RMS) 20W. Smart Service. Samsung SMART TV Smart. Convergence. Mobile to TV - Mirroring, DLNA Yes.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '4390', 7, '2020-06-16 07:53:00'),
('4c831dfa-2549-4fb0-aba8-95ff5012b66d', 'c0504', 'Nike Sunray Adjust', 'The Nike Sunray Adjust 5 is built to keep up with little ones in water, on land or wherever adventure takes them. The quick-dry design has a strap on top and behind the heel to keep it from slipping off. Lightweight, flexible foam provides durable cushioning that lasts. FLEXIBLE, LIGHTWEIGHT COMFORT FOR ALL-DAY FUN.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '299', 8, '2020-06-16 08:15:58'),
('4e528d37-dcb3-4cd9-9009-20d96e6b92f1', 'c0803', 'BMW 640IA', 'The third generation of the BMW 6 Series consists of the BMW F12 (two-door convertible ... 2018 BMW 6er Gran Coupe M Sport, F06.jpg. Overview. Production. 2011–2018.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '258000', 8, '2020-06-16 08:31:44'),
('504259a9-8293-4b94-b1ef-13e2cf1d4c57', 'c0502', 'NIKE SWOOSH', 'At its most fundamental level, the Nike Swoosh represents motion and speed. The shape depicts an arc of movement. The word \'swoosh\' is onomatopoeia for the sound you\'d hear as Lebron James or Michael Jordan zips past you en route to a spectacular dunk. In Greek mythology, Nike is the Winged Goddess of Victory.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '299', 8, '2020-06-16 08:12:21'),
('520be45e-4b9d-463a-aa1e-7db3554b1c43', 'c0403', 'KDADOKAWA 1/7 Finale', 'Figure', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '399', 8, '2020-06-16 08:06:21'),
('548f23f9-d681-4162-9dba-acd65d095a0d', 'c0603', 'Rolex GMT-Master II', 'Innovative high-technology. In addition to conventional hour, minute and seconds hands, the GMT-Master II features an arrow-tipped hand, which circles the dial once every 24 hours, as well as a bidirectional rotatable 24-hour graduated bezel.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '132000', 8, '2020-06-16 08:20:52'),
('58b4c83d-734a-4436-87f7-78f25d65671f', 'c1001', 'baby car wheels', 'This is just the wheel of the baby car, not the whole baby car.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '120', 8, '2020-06-16 08:13:05'),
('5935b2b0-2053-459c-9bb2-1f4009231266', 'c0403', 'ProsKit GE-634', 'mechanical toys', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '399', 8, '2020-06-16 08:05:30'),
('594780e7-0009-4975-841f-e3cc0e47a484', 'c0902', '1917', '1917 is a 2019 British war film . This film got some award in the 77th Golden Globe Awards.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '270', 8, '2020-06-16 08:02:40'),
('61b99d97-7874-4427-bede-07316f95e8fa', 'c1201', 'Origami paper', 'This product include 50 paper for origami which all sized 20x20.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '70', 8, '2020-06-16 08:26:19'),
('61ddb7aa-520f-443e-b64c-41f87f42d1aa', 'c0503', 'NIKE Air Max 2090', 'Released 30 years after the Air Max 90 was first launched in 1990, the Air Max 2090 is a simplified and refined version of the previous trainer. According to its designer, it demonstrates how sneaker design is evolving at Nike.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '869', 8, '2020-06-16 08:14:43'),
('67d08c64-527c-419e-b1f1-42d0f8335495', 'c0501', 'Casual Pants', 'pants', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '369', 8, '2020-06-16 08:10:40'),
('68d0c297-e83d-4344-b0c3-a20447e0b6b4', 'c1501', 'APINK PINK WORLD', 'CD', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '300', 7, '2020-06-16 08:42:48'),
('69e450b2-5ddc-438e-9058-748c807a773b', 'c0302', 'Tarmron 70-180mm', 'The MOD of the 70-180mm F/2.8 is just 0.85m (33.5 in) across the entire zoom range, a surprising accomplishment for a large-aperture telephoto zoom lens. Thanks to this short distance, at the 180mm telephoto end in particular, the Maximum Magnification Ratio is 1:4.6, allowing you to create powerful images.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '9250', 8, '2020-06-16 08:04:25'),
('6bffb2da-d8b8-49cf-b003-7c977c0c779d', 'c0105', 'Marshall Acton II', 'Acton II is the smallest speaker in the Marshall line-up, but don\'t let its size fool you. This dynamic compact speaker features three dedicated class D amplifiers that power its dual tweeters and subwoofer, for a sound that is nothing short of large.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '1999', 7, '2020-06-16 07:56:58'),
('6c3b783b-925a-4be6-8261-6105f097d138', 'c0502', 'NIKE SPACE HIPPIE 04', 'Space Hippie. Space Hippie is an exploratory footwear collection inspired by life on Mars—where materials are scarce and there is no resupply mission. Created from scraps, or “space junk,” Space Hippie is the result of sustainable practices meeting radical design.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '999', 8, '2020-06-16 08:13:07'),
('775a8deb-9311-46fc-807d-a126e2b840c6', 'c0804', '15-18 Alphard', 'DVD display', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '1000', 8, '2020-06-16 08:38:14'),
('78482b17-a40b-4a5d-bdb9-88180065a5f4', 'c1002', 'Baby walking car', 'This car can help baby learn to walk. It is save and is a good choice for the 8-months baby to use.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '754', 8, '2020-06-16 08:16:40'),
('7a964d84-7440-4c49-81b8-38eddb55ffb6', 'c1402', 'Dog food 500g', 'This is most valuable for the dog health since it have different vitamin that is good for dog health.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '325', 8, '2020-06-16 08:42:31'),
('828b40fd-fc64-466e-8ef9-ac7c37f52ced', 'c0603', 'G-shock GBD-H1000-1A7', 'The highly anticipated G-Shock G-SQUAD fitness series features built-in GPS and five sensors: an optical heart rate monitor, pressure sensor (altimeter and barometer), compass, thermometer, and accelerometer for step counting. ... As a G-Shock, the GBD-H1000 is fully shock-resistant and water-resistant to 200 meters.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '3850', 8, '2020-06-16 08:20:16'),
('879aad31-74ea-42fa-bb81-7bf5b8c2284c', 'c1202', 'Figure Knife', 'This is the figure knife to cut the component out such as the Gundam figure.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '168', 8, '2020-06-16 08:30:50'),
('87d75361-0d1d-458a-8f36-941caa66e1d1', 'c0804', 'DVD bluetooh gps', 'gps display', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '1000', 8, '2020-06-16 08:38:38'),
('88ce728b-261f-4b04-a8a6-7e6743cf6a2b', 'c1502', 'SEKAI NO OWARI', 'CD', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '300', 8, '2020-06-16 08:43:24'),
('8aa4e751-2c3a-4d9d-b46d-33e8c868da4a', 'c1403', 'Cat clothes', 'This is for the cat used clothes and can take a good picture with the cat.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '1577', 6, '2020-06-16 08:44:29'),
('8b43a18e-d01c-4b37-8c05-ddd43eb9b30d', 'c0202', 'Sony PS4 Pro', 'Pair the visual power of PS4 Pro with Sony\'s beautifully slim 4K HDR TV range and see your games explode into life with vivid color and detail. Look for the \'PS4 Pro Enhanced\' icon on software packaging. PS4 Pro plays all PS4 format games. \'PS4 Pro Enhanced\' features vary by game.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '2780', 8, '2020-06-16 08:00:46'),
('8c723ae3-d06c-4b9d-a48f-b46aa881cd10', 'c0101', 'Samsung S20 Ultra', 'The Samsung Galaxy S20 Ultra goes big in every way imaginable, with 108MP photos, a 100x camera zoom, 40MP selfies, and a 6.9-inch 120Hz display. With over-the-top internal specs on a par with some laptops, you\'ll pay more for this phone than any non-foldable phone before it, but that\'s not surprising.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '9998', 7, '2020-06-16 07:49:42'),
('8da6e457-5264-44a5-9d86-eceba7c8afb4', 'c0301', 'Leica Q2', 'The Leica Q2 is a fixed-lens compact camera with a full-frame 47-megapixel sensor, a rangefinder-style electronic viewfinder, weather-sealed body, and a price tag that\'ll make your wallet run and hide. It\'s $5,000. Leica.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '41800', 8, '2020-06-16 08:03:40'),
('93eb2273-bbf6-4767-ba24-294e3c9760a6', 'c0106', 'Sony WF-XB700', 'The Sony WF-XB700 have a lot to offer. They have a fun, energetic sound quality, feel comfortable during long listening sessions and have an 18-hour combined battery life. We don\'t love their radar-disc shape and their lack of noise cancellation, but these are undoubtedly Sony\'s second-best true wireless earbuds.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '1099', 7, '2020-06-16 07:57:57'),
('94896a95-abf8-4d02-b789-dd67bcd3c1b5', 'c1102', 'Blood pressure measurements', 'This equipment allow user to test the self blood pressure at home.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '3876', 8, '2020-06-16 08:23:01'),
('95e95911-c1c5-40b3-9a41-e6edf7788722', 'c0202', 'Nintendo Switch', 'The Nintendo Switch is a video game console developed by Nintendo, released worldwide in most regions on March 3, 2017. It is a hybrid console that can be used as a home console and portable device.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '2888', 8, '2020-06-16 08:00:17'),
('97a0a433-48a7-4634-86f6-4d768f937923', 'c1402', 'Cat food 500g', 'This is most valuable for the cat health since it have different vitamin that is good for cat health.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '325', 8, '2020-06-16 08:42:49'),
('9f669d30-f579-4463-96c7-f91a46d38cf3', 'c0704', 'Dermaci 100 ml', 'This product can fully soften the skin\'s surface keratin, loosen and export blackhead impurities and grease dirt that have accumulated in the pores for a long time, deep purifying the pores .', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '258', 7, '2020-06-16 08:29:24'),
('a6f4defd-0e73-42e8-b609-9873db8aaac4', 'c0105', 'Harman Kardon Aura Studio 3', 'El Harman Kardon Aura Studio 3: Altavoz visualmente impresionante, sonido igualmente bello. ... Las características del vidrio tintado y la tela negra complementan el espectáculo de luz ambiental integrado de 360 grados del altavoz, mostrando un efecto de ondas de agua.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '1999', 7, '2020-06-16 07:57:22'),
('a7f6b03f-7e18-48c1-bfd6-ddd2ba783ec4', 'c0302', 'Sony FE 24-105mm', 'A one-lens solution for mobile, versatile shooting Excellent optical performance and a high zoom ratio are packed into a compact, lightweight only 663 grams (23.4 oz.). ... This one high-performance lens lets you shoot a wide range of subjects and situations. A minimum focus distance of 0.38 meters (1.25ft.)', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '8850', 8, '2020-06-16 08:04:44'),
('a8351de3-4bd7-4a6d-acc5-23bdca57357f', 'c0901', 'National Strings Violin', 'This is published by the Hong Kong largest handmade violin company. It\'s product use by many famous violin master.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '4682', 8, '2020-06-16 07:56:13'),
('aa2c3e15-383a-4edd-8e22-d2670b0330e9', 'c0602', 'Daniel wellington', 'Daniel Wellington is a Swedish brand founded in 2011 by Filip Tysander. DW uses minimalist designs and social media marketing to sell watches to a younger generation of consumers. ', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '480', 8, '2020-06-16 08:19:04'),
('af206c70-f869-45cf-9655-6beb9773c11b', 'c0903', 'Violin wire', 'This wire is for the Shane\'s of the violin. It is made from wool thread and the live time is longer than the normal wire.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '471', 8, '2020-06-16 08:05:30'),
('b0e64174-cef5-4c3a-8e89-50d6bdd5b16b', 'c0902', 'Queen - Live At The Rainbow', 'Queen are a British rock band formed in London in 1970. This is one of their hot selled  CD in that time.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '560', 8, '2020-06-16 07:59:20'),
('b17c798b-6f20-4971-8ea0-9890a1eecede', 'c1301', 'Reebok crossfit', 'This is the new purchased product from the Reebok in this summer.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '199', 8, '2020-06-16 08:36:38'),
('b1c54df1-7d20-4ffd-8de2-554caf37e2c8', 'c0401', '5 second rule', 'The Five Second Rule is a board game of quick thinking and fast talking. It is not a rule which applies when a piece of food is dropped on the floor, picked up then eaten in quick succession. Basically the rules are very easy - name three things in 5 seconds flat!', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '140', 8, '2020-06-16 08:07:14'),
('b33d8555-b1cc-4fcd-84fb-cc783f32bc7d', 'c1301', 'Air Jordan 11', 'The first time it appear is in 1995 wea by Michael Jordon. It is the sixth repurchase of this version.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '1983', 8, '2020-06-16 08:35:03'),
('b3784eae-b9c6-4804-9970-8913328d067c', 'c0601', 'CELOVIS', 'jewellery', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '399', 7, '2020-06-16 08:18:10'),
('bb4b3f85-d03e-408d-b887-27e046521e96', 'c0101', 'YAMAHA Keyboard', 'This is the keyboard which is published by YAMAHA in 2010. This is the most valuable keyboard for new learner.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '3158', 7, '2020-06-16 07:52:37'),
('bed4c3b7-aee7-4a4e-bb4a-8eba3d33fa40', 'c0106', 'Apple AirPods Pro', 'AirPods Pro. Compared to the standard second-generation AirPods, the AirPods Pro feature a higher price tag, a different design with silicone ear tips and a shorter stem, active noise cancellation, and improved sound.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '1880', 7, '2020-06-16 07:58:12'),
('c19c916a-a32b-4af8-8c5e-28b5d85a0658', 'c0401', 'The Resistance: Avalon', 'The Resistance: Avalon is a hidden role game where players are either loyal servants of Arthur or minions of Mordred. The game pits the two sides against each other to see who will rule Camelot.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '128', 8, '2020-06-16 08:06:52'),
('c1a96a50-300d-465f-a4bb-8bb99008d3c8', 'c1501', 'BTS MAP OF THE SOUL:7', 'CD', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '300', 8, '2020-06-16 08:42:05'),
('c4f26639-584c-45be-8406-d1a616474f32', 'c0602', 'agnes b.', 'None', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '1890', 8, '2020-06-16 08:19:33'),
('c8d47344-5a1d-4fa7-8a92-b5f1fd1d879e', 'c0104', 'Canon EOS 5D Mark IV', 'The 4th generation model of Canon\'s best-selling full-frame EOS camera EOS 5D Mark IV comes equipped with 30.4-megapixel full-frame CMOS sensor and highly sought-after Dual Pixel CMOS AF. ... Canon Log is also made available for users who are looking to shoot serious video footage.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '15350', 7, '2020-06-16 07:56:08'),
('ca4dfd16-f2fd-4754-a536-c480c3ef01a7', 'c0604', '3M 1710', 'Protectitive glasses', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '22', 8, '2020-06-16 08:21:38'),
('cb11101a-856c-4ae5-8077-c308320de055', 'c1202', 'Spray gun', 'This is the spray gun for painting the color on to the PVC figure\'s component.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '834', 8, '2020-06-16 08:32:07'),
('cdb8247a-04cb-43b7-80ee-967f0b7f193c', 'c0104', 'Nikon D6', 'The D6 is powered by Nikon\'s fastest, most comprehensive image processing engine to date, EXPEED 6. It\'s the brains behind the DSLR\'s stunning photo and video quality, autofocus power, low-light performance, noise suppression, distortion control, image clarity, color reproduction and more.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '49800', 7, '2020-06-16 07:54:55'),
('d17b7b36-c294-45cb-bac7-835cbca817e4', 'c0301', 'Sony Vlog ZV-1', 'The ZV-1 is designed for content creation with a selfie-friendly vari-angle LCD screen, body grip and a recording lamp. A directional 3-capsule mic with wind screen picks up your voice clearly with less wind noise; and the Bokeh switch and Product Showcase Setting make videos more interesting with less effort.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '5990', 8, '2020-06-16 08:03:16'),
('d19b136b-bba7-4fd0-b9bc-91a48d367c29', 'c0602', 'Swarovski', 'Swarovski crystals are man-made gems manufactured in Austria. In 1892, Daniel Swarovski invented a machine for making precision-cut, beautiful, high quality lead glass crystals using quartz, sand, and minerals. The exact proportions of these raw materials has remained a company secret.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '799', 8, '2020-06-16 08:17:40'),
('d28aa45e-ada2-46f8-9542-2d832f06efc9', 'c0503', 'NIKE SPORTSWEAR', 'clothing', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '169', 8, '2020-06-16 08:13:45'),
('d35b46cb-4215-4441-b4d9-223eb051904c', 'c1302', 'Basketball', 'It is the basketball that is used for sporting.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '652', 8, '2020-06-16 08:38:08'),
('d53671ed-ebf2-4082-aee5-1a7691cdb6b0', 'c0802', 'Volkswagen', 'wheels kit', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '1500', 8, '2020-06-16 08:36:41'),
('dc957fba-c3bc-40dd-9a02-ed83fff6d185', 'c0802', 'Prius Wheel', 'wheels kit', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '1000', 8, '2020-06-16 08:37:07'),
('e3c2c1f2-8247-41f5-9d1f-23304454baf9', 'c0801', 'WT 596', 'car plate number', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '1600', 8, '2020-06-16 08:35:00'),
('e53bf141-8089-411d-ae32-29758b66eb07', 'c1002', 'Lego', 'Lego toys can enhance the baby\'s interest and the patient.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '579', 8, '2020-06-16 08:14:38'),
('e5b187d9-3a6a-40aa-9666-a13307f8f5e5', 'c0801', 'WB 8669', 'car plate number', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '2200', 8, '2020-06-16 08:35:19'),
('e68a8c0f-f661-459c-9990-1026dd214b32', 'c0106', 'HTC VIVE', 'The HTC Vive is a virtual reality headset developed by HTC and Valve. The headset uses ... Whilst in June 2017 Valve revealed details of a second variation of Vive controller which utilizes finger tracking called the Knuckles Vive controller.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '4888', 7, '2020-06-16 07:59:12'),
('e6ad8b8c-7fab-47ad-b052-0ec5ad467a1a', 'c0703', 'Dior Addict Lip Glow', 'A tinted balm with a velvety, matte finish for a soft blurring effect that enhances lips. Hydrating and nourishing, it has the same Color Reviver technology to flush the lips a soft pink. Works perfectly as a base with a matte lipstick.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '200', 8, '2020-06-16 08:28:04'),
('e85ae8e9-0148-46e2-b86f-6d2b1b86bc30', 'c0603', 'Watch maintain', 'Old watch is available now. If interested, tell me what is your watch type in Whatsapp.', '955e10d7-f24a-42fe-b4b5-a7179fcb8ac1', '649', 0, '2020-07-31 15:11:44'),
('ee51935e-e49d-4b5c-9d5b-8cdc31f8f715', 'c0703', '3 CONCEPT EYES 3CE', '3CE (3 Concept Eyes) is a cosmetic brand launched by Korea\'s trending fashion brand STYLENANDA. ... 3CE products are known for their long-lasting formulas and the intensity of their modern colors. 3CE is one of the youngest and most fun brands on the block,dealing in nail polish, eye makeup products and more.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '100', 8, '2020-06-16 08:27:33'),
('ef32d706-e449-4c33-b588-ae94568ef6e4', 'c1302', 'Volleyball', 'It is the volleyball that is used for sporting.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '468', 8, '2020-06-16 08:37:47'),
('efca18da-79d1-4971-8923-6c9d35dcc3c1', 'c0101', 'what', 'what', '2860c3bc-1891-4452-821c-e89fe8e2c668', '65', 0, '2020-07-23 10:57:14'),
('f6951430-85dc-480e-b086-630b461a4d6d', 'c0102', 'Samsung Notebook Plus', 'The Samsung Notebook Plus lets you makes use of both a SSD and a HDD at the same time – providing faster booting speeds and increased storage space – increasing convenience and efficiency. * Specifications may vary according to model.', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '7480', 7, '2020-06-16 07:51:35'),
('fd686095-3b7b-489d-9a54-1667806698b4', 'c0702', 'Rebecca Cosmetic', 'In 2001, BECCA Cosmetics was founded in Perth, Australia with a mission to create effortlessly glowing complexion products for every skin type and color', '86a9598b-01d8-4ccf-9590-d64f8d986a42', '98', 8, '2020-06-16 08:25:57');

-- --------------------------------------------------------

--
-- 資料表結構 `orders`
--

CREATE TABLE `orders` (
  `transactionID` varchar(255) NOT NULL,
  `accountID` varchar(255) NOT NULL,
  `productID` varchar(255) NOT NULL,
  `quantity` int(11) NOT NULL,
  `sellerID` varchar(255) NOT NULL,
  `date_added` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 傾印資料表的資料 `orders`
--

INSERT INTO `orders` (`transactionID`, `accountID`, `productID`, `quantity`, `sellerID`, `date_added`) VALUES
('L4CLSIQ16S09875U47344710', 'bb5d54b1-4522-4edb-97b4-70643af876e3', '106c9e82-b99c-47a5-ac3b-1d3466dbb344', 1, '86a9598b-01d8-4ccf-9590-d64f8d986a42', '2020-07-08 00:00:00'),
('L4CLSIQ16S09875U47344710', 'bb5d54b1-4522-4edb-97b4-70643af876e3', '1a5591a4-78ce-4878-be87-59cdfafe7da0', 1, '86a9598b-01d8-4ccf-9590-d64f8d986a42', '2020-07-08 00:00:00'),
('L4HK2WI3ED3218391941930R', 'bb5d54b1-4522-4edb-97b4-70643af876e3', '023c9318-f0cc-40f6-8780-ea26b8c64045', 1, '86a9598b-01d8-4ccf-9590-d64f8d986a42', '2020-07-15 15:17:21'),
('L4HLJQY2NW828980C311050R', 'bb5d54b1-4522-4edb-97b4-70643af876e3', '0ee40f66-a439-4cf5-aa8a-8d7014c8ddd9', -1, 'bb5d54b1-4522-4edb-97b4-70643af876e3', '2020-07-15 15:48:50'),
('L4HLJQY2NW828980C311050R', 'bb5d54b1-4522-4edb-97b4-70643af876e3', '1dded65f-e003-457c-8a08-b73b47a8e6a8', 1, '86a9598b-01d8-4ccf-9590-d64f8d986a42', '2020-07-15 15:48:50'),
('L4M3O2I7RT87594M25535332', '2860c3bc-1891-4452-821c-e89fe8e2c668', '1d204a2e-3d86-42a4-9ff8-5d54cb1588e9', 1, '86a9598b-01d8-4ccf-9590-d64f8d986a42', '2020-07-24 00:15:56'),
('L4M3O2I7RT87594M25535332', '2860c3bc-1891-4452-821c-e89fe8e2c668', '24ebcda5-cc72-444d-b15f-6ec4ebc1f817', 1, '86a9598b-01d8-4ccf-9590-d64f8d986a42', '2020-07-24 00:15:56'),
('L4M3O2I7RT87594M25535332', '2860c3bc-1891-4452-821c-e89fe8e2c668', '32d6397d-683b-4ff8-a68a-6fc0e209b7b1', 1, '86a9598b-01d8-4ccf-9590-d64f8d986a42', '2020-07-24 00:15:56'),
('L4M3O2I7RT87594M25535332', '2860c3bc-1891-4452-821c-e89fe8e2c668', '3559d5ac-290e-47de-9cc6-26ace350c41a', 1, '86a9598b-01d8-4ccf-9590-d64f8d986a42', '2020-07-24 00:15:56'),
('L4M3O2I7RT87594M25535332', '2860c3bc-1891-4452-821c-e89fe8e2c668', '457f4b95-1ad7-4f65-8da3-7a224be6696e', 1, '86a9598b-01d8-4ccf-9590-d64f8d986a42', '2020-07-24 00:15:56'),
('L4M3O2I7RT87594M25535332', '2860c3bc-1891-4452-821c-e89fe8e2c668', '6bffb2da-d8b8-49cf-b003-7c977c0c779d', 1, '86a9598b-01d8-4ccf-9590-d64f8d986a42', '2020-07-24 00:15:56'),
('L4M3O2I7RT87594M25535332', '2860c3bc-1891-4452-821c-e89fe8e2c668', '8c723ae3-d06c-4b9d-a48f-b46aa881cd10', 1, '86a9598b-01d8-4ccf-9590-d64f8d986a42', '2020-07-24 00:15:56'),
('L4M3O2I7RT87594M25535332', '2860c3bc-1891-4452-821c-e89fe8e2c668', '93eb2273-bbf6-4767-ba24-294e3c9760a6', 1, '86a9598b-01d8-4ccf-9590-d64f8d986a42', '2020-07-24 00:15:56'),
('L4M3O2I7RT87594M25535332', '2860c3bc-1891-4452-821c-e89fe8e2c668', 'a6f4defd-0e73-42e8-b609-9873db8aaac4', 1, '86a9598b-01d8-4ccf-9590-d64f8d986a42', '2020-07-24 00:15:56'),
('L4M3O2I7RT87594M25535332', '2860c3bc-1891-4452-821c-e89fe8e2c668', 'bb4b3f85-d03e-408d-b887-27e046521e96', 1, '86a9598b-01d8-4ccf-9590-d64f8d986a42', '2020-07-24 00:15:56'),
('L4M3O2I7RT87594M25535332', '2860c3bc-1891-4452-821c-e89fe8e2c668', 'bed4c3b7-aee7-4a4e-bb4a-8eba3d33fa40', 1, '86a9598b-01d8-4ccf-9590-d64f8d986a42', '2020-07-24 00:15:56'),
('L4M3O2I7RT87594M25535332', '2860c3bc-1891-4452-821c-e89fe8e2c668', 'c8d47344-5a1d-4fa7-8a92-b5f1fd1d879e', 1, '86a9598b-01d8-4ccf-9590-d64f8d986a42', '2020-07-24 00:15:56'),
('L4M3O2I7RT87594M25535332', '2860c3bc-1891-4452-821c-e89fe8e2c668', 'cdb8247a-04cb-43b7-80ee-967f0b7f193c', 1, '86a9598b-01d8-4ccf-9590-d64f8d986a42', '2020-07-24 00:15:56'),
('L4M3O2I7RT87594M25535332', '2860c3bc-1891-4452-821c-e89fe8e2c668', 'e68a8c0f-f661-459c-9990-1026dd214b32', 1, '86a9598b-01d8-4ccf-9590-d64f8d986a42', '2020-07-24 00:15:56'),
('L4M3O2I7RT87594M25535332', '2860c3bc-1891-4452-821c-e89fe8e2c668', 'f6951430-85dc-480e-b086-630b461a4d6d', 1, '86a9598b-01d8-4ccf-9590-d64f8d986a42', '2020-07-24 00:15:56'),
('L4M3V4Q6CN10186UR7343908', '955e10d7-f24a-42fe-b4b5-a7179fcb8ac1', '8aa4e751-2c3a-4d9d-b46d-33e8c868da4a', 1, '86a9598b-01d8-4ccf-9590-d64f8d986a42', '2020-07-24 00:29:54'),
('L4M6LPI02502621WK637235H', '2860c3bc-1891-4452-821c-e89fe8e2c668', '9f669d30-f579-4463-96c7-f91a46d38cf3', 1, '86a9598b-01d8-4ccf-9590-d64f8d986a42', '2020-07-24 03:32:44'),
('L4M6N4Q07K129507D144772T', '2860c3bc-1891-4452-821c-e89fe8e2c668', '29c237b0-7c0c-4d56-8a57-90407f568fe0', 1, '86a9598b-01d8-4ccf-9590-d64f8d986a42', '2020-07-24 03:37:43'),
('L4M6PIA60A952150E1918440', '2860c3bc-1891-4452-821c-e89fe8e2c668', '2fc8bba2-11b2-4fc5-8d3d-0fe3c21d4c90', 1, '86a9598b-01d8-4ccf-9590-d64f8d986a42', '2020-07-24 03:40:33'),
('L4MWRDA3VN081216H9953102', '2860c3bc-1891-4452-821c-e89fe8e2c668', '023c9318-f0cc-40f6-8780-ea26b8c64045', 1, '86a9598b-01d8-4ccf-9590-d64f8d986a42', '2020-07-23 18:38:35'),
('L4MWRDA3VN081216H9953102', '2860c3bc-1891-4452-821c-e89fe8e2c668', '1a5591a4-78ce-4878-be87-59cdfafe7da0', 1, '86a9598b-01d8-4ccf-9590-d64f8d986a42', '2020-07-23 18:38:35'),
('L4MXKFA5D797200PD628083Y', '2860c3bc-1891-4452-821c-e89fe8e2c668', '023c9318-f0cc-40f6-8780-ea26b8c64045', 1, '86a9598b-01d8-4ccf-9590-d64f8d986a42', '2020-07-23 19:32:00'),
('L4SVI7I7TY56987AM9457611', '2860c3bc-1891-4452-821c-e89fe8e2c668', 'b3784eae-b9c6-4804-9970-8913328d067c', 1, '86a9598b-01d8-4ccf-9590-d64f8d986a42', '2020-08-01 19:39:59'),
('L4SVISY25372763M6713483C', '2860c3bc-1891-4452-821c-e89fe8e2c668', '3d637a81-5cb0-459e-90c1-df77a1438e4e', 1, '86a9598b-01d8-4ccf-9590-d64f8d986a42', '2020-08-01 19:39:23'),
('L4SVJII5XB98433SB241903C', '2860c3bc-1891-4452-821c-e89fe8e2c668', '3019aeec-fa29-4c53-aacf-7fa2e949afdc', -1, '955e10d7-f24a-42fe-b4b5-a7179fcb8ac1', '2020-08-01 19:40:34'),
('L4SVJQY4M6936623A932252V', '2860c3bc-1891-4452-821c-e89fe8e2c668', '4fb8515b-4792-490f-935e-44a040a002bc', -1, '955e10d7-f24a-42fe-b4b5-a7179fcb8ac1', '2020-08-01 19:41:08'),
('L4SVJZA0XV97432UM065414G', '2860c3bc-1891-4452-821c-e89fe8e2c668', 'f0f53846-5658-4365-b969-c6e99a350c3f', -1, '955e10d7-f24a-42fe-b4b5-a7179fcb8ac1', '2020-08-01 19:41:41'),
('L4SVK7I4T175123759610309', '2860c3bc-1891-4452-821c-e89fe8e2c668', '0c64728b-5288-4631-b142-68376c457d10', 1, '86a9598b-01d8-4ccf-9590-d64f8d986a42', '2020-08-01 19:44:13'),
('L4SVKBI2WB613534U713080P', '2860c3bc-1891-4452-821c-e89fe8e2c668', 'fee55fdf-483d-43a4-b304-1b61f9c3e875', -1, '955e10d7-f24a-42fe-b4b5-a7179fcb8ac1', '2020-08-01 19:42:15'),
('L4SVKKA2EJ36955F5599514X', '2860c3bc-1891-4452-821c-e89fe8e2c668', '68d0c297-e83d-4344-b0c3-a20447e0b6b4', 1, '86a9598b-01d8-4ccf-9590-d64f8d986a42', '2020-08-01 19:42:51'),
('L4SVKWA4XM30361098056458', '2860c3bc-1891-4452-821c-e89fe8e2c668', '3aa3e409-04f8-4f0e-bfa7-1d8a432a7362', 1, '86a9598b-01d8-4ccf-9590-d64f8d986a42', '2020-08-01 19:43:37');

-- --------------------------------------------------------

--
-- 資料表結構 `photo`
--

CREATE TABLE `photo` (
  `productID` varchar(255) NOT NULL,
  `img` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 傾印資料表的資料 `photo`
--

INSERT INTO `photo` (`productID`, `img`) VALUES
('0018e162-ce82-4dbb-a95e-761a07302ee7', 'https://imgur.com/gzc2jrD.jpg'),
('0018f162-ce82-4dbb-a95e-761a07302ee7', 'https://imgur.com/7qRRbiG.jpg'),
('023c9318-f0cc-40f6-8780-ea26b8c64045', 'https://imgur.com/bZLYusC.jpg'),
('084c536b-6c3d-4f21-8b07-2bcf63e66efa', 'https://i.imgur.com/GACNG5X.jpg'),
('0bad8572-6653-4ea1-8f6b-165cbad3e56a', 'https://i.imgur.com/MqCyQ43.jpg'),
('0c64728b-5288-4631-b142-68376c457d10', 'https://imgur.com/Z7UV3eF.jpg'),
('0edd80c8-240a-42a8-b164-b2a79a561519', 'https://imgur.com/4CCrw3z.jpg'),
('0f4c1120-60ad-4e97-b13f-1142e500d5d3', 'https://imgur.com/eOjzDR8.jpg'),
('106c9e82-b99c-47a5-ac3b-1d3466dbb344', 'https://imgur.com/7qRRbiG.jpg'),
('1a5591a4-78ce-4878-be87-59cdfafe7da0', 'https://imgur.com/W8hjdim.jpg'),
('1d204a2e-3d86-42a4-9ff8-5d54cb1588e9', 'https://imgur.com/a7kxQsU.jpg'),
('1dded65f-e003-457c-8a08-b73b47a8e6a8', 'https://imgur.com/GxGoam7.jpg'),
('1eecd07d-bbae-4daf-a3f3-af88ddabd2e1', 'https://imgur.com/JFYX2qi.jpg'),
('234ce96d-0dc0-49f2-8b96-1cf5a1c9c8d5', 'https://i.imgur.com/4HhLfqB.jpg'),
('24ebcda5-cc72-444d-b15f-6ec4ebc1f817', 'https://imgur.com/wHT9ipX.jpg'),
('284ffb3f-9ab1-4783-a27e-7052160c2b5b', 'https://imgur.com/XhKkbSC.jpg'),
('29c237b0-7c0c-4d56-8a57-90407f568fe0', 'https://imgur.com/U4lbKkI.jpg'),
('2fc8bba2-11b2-4fc5-8d3d-0fe3c21d4c90', 'https://imgur.com/rEeg6Ae.jpg'),
('3019aeec-fa29-4c53-aacf-7fa2e949afdc', 'https://i.imgur.com/LrrF2Rs.jpg'),
('32d6397d-683b-4ff8-a68a-6fc0e209b7b1', 'https://imgur.com/6MbBtn6.jpg'),
('335fcf53-221e-4c19-92ef-a51692127911', 'https://imgur.com/0GddHk5.jpg'),
('3559d5ac-290e-47de-9cc6-26ace350c41a', 'https://imgur.com/wVJhKHN.jpg'),
('358c66ff-b890-4f14-af18-8a3953aac40a', 'https://imgur.com/mdn6gK8.jpg'),
('3aa3e409-04f8-4f0e-bfa7-1d8a432a7362', 'https://imgur.com/KW4x3bk.jpg'),
('3cad1139-4753-4055-bc61-4f4ceb2460b0', 'https://imgur.com/twiubtE.jpg'),
('3d425bff-65fe-4e74-bf2a-7d793c029ece', 'https://i.imgur.com/ie15hUG.jpg'),
('3d637a81-5cb0-459e-90c1-df77a1438e4e', 'https://imgur.com/chHZuYW.jpg'),
('3e4d2150-1c9e-428f-980f-1136ac31e9f8', 'https://imgur.com/0eAKVhu.jpg'),
('3f1cfec9-f147-4593-bdf6-4be3386c0f11', 'https://i.imgur.com/W1nk6Bi.jpg'),
('423b367b-2932-41d9-9792-42b65f1ff62c', 'https://imgur.com/eH3weWk.jpg'),
('457f4b95-1ad7-4f65-8da3-7a224be6696e', 'https://imgur.com/03nxMMs.jpg'),
('4c831dfa-2549-4fb0-aba8-95ff5012b66d', 'https://imgur.com/o2MNw5c.jpg'),
('4e528d37-dcb3-4cd9-9009-20d96e6b92f1', 'https://imgur.com/B5Tl3SZ.jpg'),
('4fb8515b-4792-490f-935e-44a040a002bc', 'https://i.imgur.com/bKFXAaW.jpg'),
('504259a9-8293-4b94-b1ef-13e2cf1d4c57', 'https://imgur.com/JWk2NR2.jpg'),
('520a0e1f-526e-453f-b8e3-be016c105cb2', 'https://i.imgur.com/wCSlg5y.jpg'),
('520be45e-4b9d-463a-aa1e-7db3554b1c43', 'https://imgur.com/nN73oXu.jpg'),
('548f23f9-d681-4162-9dba-acd65d095a0d', 'https://imgur.com/uvaBz2p.jpg'),
('57b7c9aa-d180-47d9-8cf5-ca3edb441844', 'https://i.imgur.com/k10VnPB.jpg'),
('58b4c83d-734a-4436-87f7-78f25d65671f', 'https://imgur.com/rW9Xz3Y.jpg'),
('5935b2b0-2053-459c-9bb2-1f4009231266', 'https://imgur.com/wcFbd9C.jpg'),
('594780e7-0009-4975-841f-e3cc0e47a484', 'https://imgur.com/gXT0FAU.jpg'),
('60e65621-5e56-476a-bd6c-dcc581cbf894', 'https://i.imgur.com/E4OFlh3.jpg'),
('61b99d97-7874-4427-bede-07316f95e8fa', 'https://imgur.com/PEYsVL0.jpg'),
('61ddb7aa-520f-443e-b64c-41f87f42d1aa', 'https://imgur.com/aEw8aqR.jpg'),
('67d08c64-527c-419e-b1f1-42d0f8335495', 'https://imgur.com/XMKjsxb.jpg'),
('68d0c297-e83d-4344-b0c3-a20447e0b6b4', 'https://imgur.com/6Tc3h5g.jpg'),
('69e450b2-5ddc-438e-9058-748c807a773b', 'https://i.imgur.com/FFXPjKk.jpg'),
('6bffb2da-d8b8-49cf-b003-7c977c0c779d', 'https://imgur.com/plu8pkD.jpg'),
('6c3b783b-925a-4be6-8261-6105f097d138', 'https://imgur.com/WA00Rlc.jpg'),
('775a8deb-9311-46fc-807d-a126e2b840c6', 'https://imgur.com/tjPMLRy.jpg'),
('78482b17-a40b-4a5d-bdb9-88180065a5f4', 'https://imgur.com/SrcP0fa.jpg'),
('7a964d84-7440-4c49-81b8-38eddb55ffb6', 'https://imgur.com/zVLplKG.jpg'),
('828b40fd-fc64-466e-8ef9-ac7c37f52ced', 'https://imgur.com/xFKq1dd.jpg'),
('85b4fa4c-f354-4a19-93f4-f1dfe49ba15d', 'https://i.imgur.com/5GZxEXi.jpg'),
('879aad31-74ea-42fa-bb81-7bf5b8c2284c', 'https://imgur.com/dAAxTDh.jpg'),
('87d75361-0d1d-458a-8f36-941caa66e1d1', 'https://imgur.com/HlZu1Zx.jpg'),
('88ce728b-261f-4b04-a8a6-7e6743cf6a2b', 'https://imgur.com/JpqudDb.jpg'),
('8aa4e751-2c3a-4d9d-b46d-33e8c868da4a', 'https://imgur.com/SOCLy5v.jpg'),
('8b43a18e-d01c-4b37-8c05-ddd43eb9b30d', 'https://imgur.com/2zrZHnA.jpg'),
('8c723ae3-d06c-4b9d-a48f-b46aa881cd10', 'https://imgur.com/fbxd1IP.jpg'),
('8da6e457-5264-44a5-9d86-eceba7c8afb4', 'https://imgur.com/2ErJHLO.jpg'),
('90d75d0f-794d-443c-84ba-e50d54e85d64', 'https://i.imgur.com/KNZnu0R.jpg'),
('93eb2273-bbf6-4767-ba24-294e3c9760a6', 'https://imgur.com/ad6utQo.jpg'),
('94896a95-abf8-4d02-b789-dd67bcd3c1b5', 'https://imgur.com/qoiEUDN.jpg'),
('95e95911-c1c5-40b3-9a41-e6edf7788722', 'https://imgur.com/SNxeBC3.jpg'),
('97a0a433-48a7-4634-86f6-4d768f937923', 'https://imgur.com/lD46JJg.jpg'),
('9f669d30-f579-4463-96c7-f91a46d38cf3', 'https://imgur.com/mkSFULz.jpg'),
('a6f4defd-0e73-42e8-b609-9873db8aaac4', 'https://imgur.com/2tZxcnb.jpg'),
('a7f6b03f-7e18-48c1-bfd6-ddd2ba783ec4', 'https://imgur.com/rFTLN7G.jpg'),
('a8351de3-4bd7-4a6d-acc5-23bdca57357f', 'https://imgur.com/LZWvhs7.jpg'),
('aa2c3e15-383a-4edd-8e22-d2670b0330e9', 'https://imgur.com/wMSAmM1.jpg'),
('af206c70-f869-45cf-9655-6beb9773c11b', 'https://imgur.com/Lr1vTLj.jpg'),
('b0e64174-cef5-4c3a-8e89-50d6bdd5b16b', 'https://imgur.com/5VWuqAD.jpg'),
('b17c798b-6f20-4971-8ea0-9890a1eecede', 'https://imgur.com/q6bpJVG.jpg'),
('b1c54df1-7d20-4ffd-8de2-554caf37e2c8', 'https://imgur.com/pZ2BFhj.jpg'),
('b33d8555-b1cc-4fcd-84fb-cc783f32bc7d', 'https://imgur.com/QBhq3Za.jpg'),
('b3784eae-b9c6-4804-9970-8913328d067c', 'https://imgur.com/n7VYbuK.jpg'),
('ba65fb1c-f8f9-429b-9e9a-97ae882b433d', 'https://i.imgur.com/fDHjcSW.jpg'),
('bb4b3f85-d03e-408d-b887-27e046521e96', 'https://imgur.com/O7v63Z5.jpg'),
('bd474294-6ba2-42e8-b796-46328c1754f3', 'https://i.imgur.com/8YjK0kc.jpg'),
('bed4c3b7-aee7-4a4e-bb4a-8eba3d33fa40', 'https://imgur.com/66okeMR.jpg'),
('c19c916a-a32b-4af8-8c5e-28b5d85a0658', 'https://imgur.com/ADhMxY8.jpg'),
('c1a96a50-300d-465f-a4bb-8bb99008d3c8', 'https://imgur.com/M3S7R6x.jpg'),
('c4f26639-584c-45be-8406-d1a616474f32', 'https://imgur.com/sbcD1kw.jpg'),
('c4f41914-655e-47fd-97b7-588dc434f1d2', 'https://i.imgur.com/PYnTX6C.jpg'),
('c8d47344-5a1d-4fa7-8a92-b5f1fd1d879e', 'https://imgur.com/3aG1IAp.jpg'),
('ca4dfd16-f2fd-4754-a536-c480c3ef01a7', 'https://imgur.com/QiiB0WE.jpg'),
('cb11101a-856c-4ae5-8077-c308320de055', 'https://imgur.com/9Ui2tDg.jpg'),
('cdb8247a-04cb-43b7-80ee-967f0b7f193c', 'https://imgur.com/xuS6rnk.jpg'),
('d17b7b36-c294-45cb-bac7-835cbca817e4', 'https://imgur.com/JcIGrHt.jpg'),
('d19b136b-bba7-4fd0-b9bc-91a48d367c29', 'https://imgur.com/VJcIA2k.jpg'),
('d28aa45e-ada2-46f8-9542-2d832f06efc9', 'https://imgur.com/W7OYJTz.jpg'),
('d35b46cb-4215-4441-b4d9-223eb051904c', 'https://imgur.com/NdydqHI.jpg'),
('d53671ed-ebf2-4082-aee5-1a7691cdb6b0', 'https://imgur.com/iaRsVXH.jpg'),
('dc957fba-c3bc-40dd-9a02-ed83fff6d185', 'https://imgur.com/7Aak84p.jpg'),
('e3c2c1f2-8247-41f5-9d1f-23304454baf9', 'https://imgur.com/yHcxVoy.jpg'),
('e53bf141-8089-411d-ae32-29758b66eb07', 'https://imgur.com/szDVhUU.jpg'),
('e5b187d9-3a6a-40aa-9666-a13307f8f5e5', 'https://imgur.com/r12JZTx.jpg'),
('e68a8c0f-f661-459c-9990-1026dd214b32', 'https://imgur.com/nyVtUP0.jpg'),
('e6ad8b8c-7fab-47ad-b052-0ec5ad467a1a', 'https://imgur.com/d2nNrHS.jpg'),
('e85ae8e9-0148-46e2-b86f-6d2b1b86bc30', 'https://i.imgur.com/zcVOECR.jpg'),
('ee51935e-e49d-4b5c-9d5b-8cdc31f8f715', 'https://imgur.com/NTKl58Q.jpg'),
('ef32d706-e449-4c33-b588-ae94568ef6e4', 'https://imgur.com/BAsV8F0.jpg'),
('efca18da-79d1-4971-8923-6c9d35dcc3c1', 'https://i.imgur.com/sB3IO9N.jpg'),
('f0f53846-5658-4365-b969-c6e99a350c3f', 'https://i.imgur.com/v9MNTXf.jpg'),
('f6951430-85dc-480e-b086-630b461a4d6d', 'https://imgur.com/yTTWIRd.jpg'),
('f7cf9e64-ebb8-4a42-bb24-a4d3db06218a', 'https://i.imgur.com/z5mk1sB.jpg'),
('fd686095-3b7b-489d-9a54-1667806698b4', 'https://imgur.com/Ha1u2De.jpg'),
('fee55fdf-483d-43a4-b304-1b61f9c3e875', 'https://i.imgur.com/snF5rGB.jpg');

-- --------------------------------------------------------

--
-- 資料表結構 `rating`
--

CREATE TABLE `rating` (
  `accountID` varchar(255) NOT NULL,
  `productID` varchar(255) NOT NULL,
  `rating` int(5) NOT NULL,
  `commentID` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 傾印資料表的資料 `rating`
--

INSERT INTO `rating` (`accountID`, `productID`, `rating`, `commentID`) VALUES
('2860c3bc-1891-4452-821c-e89fe8e2c668', '023c9318-f0cc-40f6-8780-ea26b8c64045', 10, '19eef59e-07b1-43bf-8258-768a777335e4'),
('bb5d54b1-4522-4edb-97b4-70643af876e3', '023c9318-f0cc-40f6-8780-ea26b8c64045', 0, 'd61bfb3c-bef3-4cb2-b1ec-90215bd18152'),
('bb5d54b1-4522-4edb-97b4-70643af876e3', '0ee40f66-a439-4cf5-aa8a-8d7014c8ddd9', 10, 'af5a1af3-ade7-407e-bf99-6eb92c9e0833'),
('bb5d54b1-4522-4edb-97b4-70643af876e3', '1a5591a4-78ce-4878-be87-59cdfafe7da0', 10, '5b4759f6-141a-4935-b676-c04a47a09ff4');

-- --------------------------------------------------------

--
-- 資料表結構 `search_history`
--

CREATE TABLE `search_history` (
  `accountID` varchar(255) NOT NULL,
  `keyword` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 傾印資料表的資料 `search_history`
--

INSERT INTO `search_history` (`accountID`, `keyword`) VALUES
('2860c3bc-1891-4452-821c-e89fe8e2c668', ''),
('2860c3bc-1891-4452-821c-e89fe8e2c668', 'a'),
('2860c3bc-1891-4452-821c-e89fe8e2c668', 'as'),
('2860c3bc-1891-4452-821c-e89fe8e2c668', 'asd'),
('2860c3bc-1891-4452-821c-e89fe8e2c668', 'h'),
('2860c3bc-1891-4452-821c-e89fe8e2c668', 'htc'),
('2860c3bc-1891-4452-821c-e89fe8e2c668', 'i'),
('2860c3bc-1891-4452-821c-e89fe8e2c668', 'isme'),
('2860c3bc-1891-4452-821c-e89fe8e2c668', 'lego'),
('2860c3bc-1891-4452-821c-e89fe8e2c668', 'sam'),
('bb5d54b1-4522-4edb-97b4-70643af876e3', 'h'),
('bb5d54b1-4522-4edb-97b4-70643af876e3', 'ha'),
('bb5d54b1-4522-4edb-97b4-70643af876e3', 'htc'),
('bb5d54b1-4522-4edb-97b4-70643af876e3', 'l'),
('bb5d54b1-4522-4edb-97b4-70643af876e3', 'la'),
('bb5d54b1-4522-4edb-97b4-70643af876e3', 'last'),
('bb5d54b1-4522-4edb-97b4-70643af876e3', 'lego');

-- --------------------------------------------------------

--
-- 資料表結構 `service`
--

CREATE TABLE `service` (
  `serviceID` varchar(255) NOT NULL,
  `cID` varchar(255) NOT NULL,
  `sName` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `sellerID` varchar(255) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `date_added` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 傾印資料表的資料 `service`
--

INSERT INTO `service` (`serviceID`, `cID`, `sName`, `description`, `sellerID`, `price`, `date_added`) VALUES
('0bad8572-6653-4ea1-8f6b-165cbad3e56a', 'c0103', 'TV walk-in maintain', 'Contact in Whatsapp for more detail', '955e10d7-f24a-42fe-b4b5-a7179fcb8ac1', '300', '2020-07-31 14:49:34'),
('234ce96d-0dc0-49f2-8b96-1cf5a1c9c8d5', 'c0105', 'Switch renting service', 'Include 10 games and the two hand hold ', '955e10d7-f24a-42fe-b4b5-a7179fcb8ac1', '400', '2020-07-31 14:55:20'),
('3019aeec-fa29-4c53-aacf-7fa2e949afdc', 'c0102', 'Online computer maintain', 'By using the TeamViewer to help you fix the problem of your computer hand in hand.', '955e10d7-f24a-42fe-b4b5-a7179fcb8ac1', '500', '2020-07-31 14:47:02'),
('3d425bff-65fe-4e74-bf2a-7d793c029ece', 'c0101', 'Online UNO account selling', 'The online UNO account is available here. Faster come and join the UNO game.', '955e10d7-f24a-42fe-b4b5-a7179fcb8ac1', '42', '2020-07-31 15:06:36'),
('3f1cfec9-f147-4593-bdf6-4be3386c0f11', 'c1002', 'Baby toys group buying', 'Group buy is a lot cheaper that just buy one to in real shopping mall.', '2860c3bc-1891-4452-821c-e89fe8e2c668', '46', '2020-07-31 15:37:00'),
('4fb8515b-4792-490f-935e-44a040a002bc', 'c0504', 'Cloth recovery service', 'The house factory of recover the cloth for you and all different patterns is available.', '955e10d7-f24a-42fe-b4b5-a7179fcb8ac1', '700', '2020-07-31 15:08:51'),
('520a0e1f-526e-453f-b8e3-be016c105cb2', 'c1002', 'Nurse blood measure service', 'The home coming blood measure is a service for the elderly who is not able to go to see doctor.', '2860c3bc-1891-4452-821c-e89fe8e2c668', '452', '2020-07-31 15:42:10'),
('57b7c9aa-d180-47d9-8cf5-ca3edb441844', 'c0802', 'Car wheels changes', 'Whatsapp me for more details and the location of the station', '2860c3bc-1891-4452-821c-e89fe8e2c668', '1200', '2020-07-31 15:32:31'),
('60e65621-5e56-476a-bd6c-dcc581cbf894', 'c1203', 'Craft teaching class', 'The one to one craft is now available, please contact us in Whatsapp for more details.', '2860c3bc-1891-4452-821c-e89fe8e2c668', '321', '2020-07-31 15:44:28'),
('85b4fa4c-f354-4a19-93f4-f1dfe49ba15d', 'c0101', 'X-T30 renting service', 'The old camera X-T30 is good to use and it welcome to rent to all people like this camera.', '955e10d7-f24a-42fe-b4b5-a7179fcb8ac1', '200', '2020-07-31 15:03:54'),
('ba65fb1c-f8f9-429b-9e9a-97ae882b433d', 'c0902', 'Deadpool Blueray renting', 'The Deadpool is now available  online , rent it now.', '2860c3bc-1891-4452-821c-e89fe8e2c668', '80', '2020-07-31 15:29:49'),
('c4f41914-655e-47fd-97b7-588dc434f1d2', 'c1402', 'Dog food group buy', 'Here is the dog food group buy.', '2860c3bc-1891-4452-821c-e89fe8e2c668', '420', '2020-07-31 16:24:08'),
('f0f53846-5658-4365-b969-c6e99a350c3f', 'c0203', 'PS4 online sell', 'Here include all different PS4 games, Whatsapp me for more detail', '955e10d7-f24a-42fe-b4b5-a7179fcb8ac1', '480', '2020-07-31 14:57:21'),
('f7cf9e64-ebb8-4a42-bb24-a4d3db06218a', 'c0105', 'Hi-Fi renting service', 'The professional Hi-Fi device here, come to see more', '955e10d7-f24a-42fe-b4b5-a7179fcb8ac1', '700', '2020-07-31 14:52:26'),
('fee55fdf-483d-43a4-b304-1b61f9c3e875', 'c0201', '7-days local network service', 'This is the 7 days Hong Kong local WiFi with limited usage of 4GB.', '955e10d7-f24a-42fe-b4b5-a7179fcb8ac1', '104', '2020-07-31 14:43:51');

-- --------------------------------------------------------

--
-- 資料表結構 `sub_category`
--

CREATE TABLE `sub_category` (
  `subCID` varchar(255) NOT NULL,
  `cID` varchar(255) NOT NULL,
  `cName` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 傾印資料表的資料 `sub_category`
--

INSERT INTO `sub_category` (`subCID`, `cID`, `cName`) VALUES
('c0101', 'c0001', 'Mobile Phones'),
('c0102', 'c0001', 'Computers'),
('c0103', 'c0001', 'Televisions'),
('c0104', 'c0001', 'Entertainment Systems'),
('c0105', 'c0001', 'Audio Systems'),
('c0106', 'c0001', 'Mobile Accessories'),
('c0201', 'c0002', 'Gaming Accessories'),
('c0202', 'c0002', 'Game Consoles'),
('c0203', 'c0002', 'Video Games'),
('c0301', 'c0003', 'Cameras'),
('c0302', 'c0003', 'Camera Accessories'),
('c0401', 'c0004', 'Board Games and Cards'),
('c0402', 'c0004', 'Soft Toys'),
('c0403', 'c0004', 'Others'),
('c0501', 'c0005', 'Men\'s Clothing'),
('c0502', 'c0005', 'Women\'s Clothing'),
('c0503', 'c0005', 'Kid\'s Clothing'),
('c0504', 'c0005', 'Others'),
('c0601', 'c0006', 'Piercings'),
('c0602', 'c0006', 'Jewelry '),
('c0603', 'c0006', 'Watches'),
('c0604', 'c0006', 'Others'),
('c0701', 'c0007', 'Face Makeup'),
('c0702', 'c0007', 'Eye Makeup'),
('c0703', 'c0007', 'Lip Makeup'),
('c0704', 'c0007', 'Skin Care'),
('c0801', 'c0008', 'Car Plate'),
('c0802', 'c0008', 'Wheels'),
('c0803', 'c0008', 'Cars'),
('c0804', 'c0008', 'Others'),
('c0901', 'c0009', 'Music Instruments'),
('c0902', 'c0009', 'CDs, DVDs and Others'),
('c0903', 'c0009', 'Music Accessories'),
('c1001', 'c0010', 'Params and Strollers'),
('c1002', 'c0010', 'Baby Toys'),
('c1003', 'c0010', 'Others'),
('c1101', 'c0011', 'Health Care Products'),
('c1102', 'c0011', 'Medical Equipment '),
('c1201', 'c0012', 'Handmade Crafts'),
('c1202', 'c0012', 'Carft Tools'),
('c1203', 'c0012', 'Others'),
('c1301', 'c0013', 'Sports Clothing'),
('c1302', 'c0013', 'Sports Equipment '),
('c1401', 'c0014', 'Pet Accessories'),
('c1402', 'c0014', 'Pet Food'),
('c1403', 'c0014', 'Pet Clothes'),
('c1501', 'c0015', 'K-pop'),
('c1502', 'c0015', 'J-Pop'),
('c1503', 'c0015', 'Others');

-- --------------------------------------------------------

--
-- 資料表結構 `user`
--

CREATE TABLE `user` (
  `accountID` varchar(255) NOT NULL,
  `userID` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(10) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `bio` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- 傾印資料表的資料 `user`
--

INSERT INTO `user` (`accountID`, `userID`, `password`, `name`, `phone`, `email`, `address`, `bio`) VALUES
('2860c3bc-1891-4452-821c-e89fe8e2c668', 'asd', 'asd', 'asd', '62549411', 'kkoo94182315@gmail.com', 'honk knog', ''),
('86a9598b-01d8-4ccf-9590-d64f8d986a42', 'd', 'dd', 'd', '62549411', 'kkoo94182315@gmail.com', 'kowloon', ''),
('955e10d7-f24a-42fe-b4b5-a7179fcb8ac1', 'qwe', 'qwe', 'qwe', '62549411', 'kkoo94182315@gmail.com', 'kowloon bay', ''),
('bb5d54b1-4522-4edb-97b4-70643af876e3', 'ad', 'ad', 'ad', '62549411', 'kkoo94182315@gmail.com', 'kowloon city', '');

-- --------------------------------------------------------

--
-- 資料表結構 `view_history`
--

CREATE TABLE `view_history` (
  `viewID` int(11) NOT NULL,
  `accountID` varchar(255) NOT NULL,
  `productID` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- 傾印資料表的資料 `view_history`
--

INSERT INTO `view_history` (`viewID`, `accountID`, `productID`) VALUES
(17, 'bb5d54b1-4522-4edb-97b4-70643af876e3', '0c64728b-5288-4631-b142-68376c457d10'),
(18, 'bb5d54b1-4522-4edb-97b4-70643af876e3', '0018e162-ce82-4dbb-a95e-761a07302ee7'),
(19, 'bb5d54b1-4522-4edb-97b4-70643af876e3', '023c9318-f0cc-40f6-8780-ea26b8c64045'),
(22, 'bb5d54b1-4522-4edb-97b4-70643af876e3', '1dded65f-e003-457c-8a08-b73b47a8e6a8'),
(23, 'bb5d54b1-4522-4edb-97b4-70643af876e3', '29c237b0-7c0c-4d56-8a57-90407f568fe0'),
(24, 'bb5d54b1-4522-4edb-97b4-70643af876e3', '106c9e82-b99c-47a5-ac3b-1d3466dbb344'),
(26, 'bb5d54b1-4522-4edb-97b4-70643af876e3', '1a5591a4-78ce-4878-be87-59cdfafe7da0'),
(27, '86a9598b-01d8-4ccf-9590-d64f8d986a42', '0edd80c8-240a-42a8-b164-b2a79a561519'),
(28, '86a9598b-01d8-4ccf-9590-d64f8d986a42', '023c9318-f0cc-40f6-8780-ea26b8c64045'),
(29, '2860c3bc-1891-4452-821c-e89fe8e2c668', 'e68a8c0f-f661-459c-9990-1026dd214b32'),
(30, '2860c3bc-1891-4452-821c-e89fe8e2c668', '1a5591a4-78ce-4878-be87-59cdfafe7da0'),
(31, '2860c3bc-1891-4452-821c-e89fe8e2c668', '0018e162-ce82-4dbb-a95e-761a07302ee7'),
(32, '2860c3bc-1891-4452-821c-e89fe8e2c668', '023c9318-f0cc-40f6-8780-ea26b8c64045'),
(35, '2860c3bc-1891-4452-821c-e89fe8e2c668', 'bed4c3b7-aee7-4a4e-bb4a-8eba3d33fa40'),
(36, '2860c3bc-1891-4452-821c-e89fe8e2c668', '32d6397d-683b-4ff8-a68a-6fc0e209b7b1'),
(37, '2860c3bc-1891-4452-821c-e89fe8e2c668', '93eb2273-bbf6-4767-ba24-294e3c9760a6'),
(38, '2860c3bc-1891-4452-821c-e89fe8e2c668', 'a6f4defd-0e73-42e8-b609-9873db8aaac4'),
(39, '2860c3bc-1891-4452-821c-e89fe8e2c668', '6bffb2da-d8b8-49cf-b003-7c977c0c779d'),
(40, '2860c3bc-1891-4452-821c-e89fe8e2c668', 'c8d47344-5a1d-4fa7-8a92-b5f1fd1d879e'),
(41, '2860c3bc-1891-4452-821c-e89fe8e2c668', 'cdb8247a-04cb-43b7-80ee-967f0b7f193c'),
(42, '2860c3bc-1891-4452-821c-e89fe8e2c668', '457f4b95-1ad7-4f65-8da3-7a224be6696e'),
(43, '2860c3bc-1891-4452-821c-e89fe8e2c668', 'bb4b3f85-d03e-408d-b887-27e046521e96'),
(44, '2860c3bc-1891-4452-821c-e89fe8e2c668', '24ebcda5-cc72-444d-b15f-6ec4ebc1f817'),
(45, '2860c3bc-1891-4452-821c-e89fe8e2c668', 'f6951430-85dc-480e-b086-630b461a4d6d'),
(46, '2860c3bc-1891-4452-821c-e89fe8e2c668', '3559d5ac-290e-47de-9cc6-26ace350c41a'),
(47, '2860c3bc-1891-4452-821c-e89fe8e2c668', '8c723ae3-d06c-4b9d-a48f-b46aa881cd10'),
(48, '2860c3bc-1891-4452-821c-e89fe8e2c668', '1d204a2e-3d86-42a4-9ff8-5d54cb1588e9'),
(49, '2860c3bc-1891-4452-821c-e89fe8e2c668', '8aa4e751-2c3a-4d9d-b46d-33e8c868da4a'),
(50, '955e10d7-f24a-42fe-b4b5-a7179fcb8ac1', '8aa4e751-2c3a-4d9d-b46d-33e8c868da4a'),
(51, '2860c3bc-1891-4452-821c-e89fe8e2c668', '9f669d30-f579-4463-96c7-f91a46d38cf3'),
(52, '2860c3bc-1891-4452-821c-e89fe8e2c668', '29c237b0-7c0c-4d56-8a57-90407f568fe0'),
(53, '2860c3bc-1891-4452-821c-e89fe8e2c668', '2fc8bba2-11b2-4fc5-8d3d-0fe3c21d4c90'),
(54, '2860c3bc-1891-4452-821c-e89fe8e2c668', '234ce96d-0dc0-49f2-8b96-1cf5a1c9c8d5'),
(55, '955e10d7-f24a-42fe-b4b5-a7179fcb8ac1', '0bad8572-6653-4ea1-8f6b-165cbad3e56a'),
(56, '955e10d7-f24a-42fe-b4b5-a7179fcb8ac1', '234ce96d-0dc0-49f2-8b96-1cf5a1c9c8d5'),
(57, 'bb5d54b1-4522-4edb-97b4-70643af876e3', '0edd80c8-240a-42a8-b164-b2a79a561519'),
(58, '2860c3bc-1891-4452-821c-e89fe8e2c668', '3d425bff-65fe-4e74-bf2a-7d793c029ece'),
(59, '2860c3bc-1891-4452-821c-e89fe8e2c668', '85b4fa4c-f354-4a19-93f4-f1dfe49ba15d'),
(60, '2860c3bc-1891-4452-821c-e89fe8e2c668', '4fb8515b-4792-490f-935e-44a040a002bc'),
(61, '2860c3bc-1891-4452-821c-e89fe8e2c668', '57b7c9aa-d180-47d9-8cf5-ca3edb441844'),
(62, '2860c3bc-1891-4452-821c-e89fe8e2c668', '3019aeec-fa29-4c53-aacf-7fa2e949afdc'),
(63, '2860c3bc-1891-4452-821c-e89fe8e2c668', '0bad8572-6653-4ea1-8f6b-165cbad3e56a'),
(64, '2860c3bc-1891-4452-821c-e89fe8e2c668', 'f7cf9e64-ebb8-4a42-bb24-a4d3db06218a'),
(65, '2860c3bc-1891-4452-821c-e89fe8e2c668', 'efca18da-79d1-4971-8923-6c9d35dcc3c1'),
(66, '2860c3bc-1891-4452-821c-e89fe8e2c668', 'cb11101a-856c-4ae5-8077-c308320de055'),
(67, '2860c3bc-1891-4452-821c-e89fe8e2c668', 'd35b46cb-4215-4441-b4d9-223eb051904c'),
(68, '2860c3bc-1891-4452-821c-e89fe8e2c668', 'ca4dfd16-f2fd-4754-a536-c480c3ef01a7'),
(69, '2860c3bc-1891-4452-821c-e89fe8e2c668', 'c1a96a50-300d-465f-a4bb-8bb99008d3c8'),
(70, '2860c3bc-1891-4452-821c-e89fe8e2c668', '828b40fd-fc64-466e-8ef9-ac7c37f52ced'),
(71, '2860c3bc-1891-4452-821c-e89fe8e2c668', '0c64728b-5288-4631-b142-68376c457d10'),
(72, '2860c3bc-1891-4452-821c-e89fe8e2c668', 'aa2c3e15-383a-4edd-8e22-d2670b0330e9'),
(73, '2860c3bc-1891-4452-821c-e89fe8e2c668', '284ffb3f-9ab1-4783-a27e-7052160c2b5b'),
(74, '955e10d7-f24a-42fe-b4b5-a7179fcb8ac1', '775a8deb-9311-46fc-807d-a126e2b840c6'),
(77, 'bb5d54b1-4522-4edb-97b4-70643af876e3', '3f1cfec9-f147-4593-bdf6-4be3386c0f11'),
(78, '2860c3bc-1891-4452-821c-e89fe8e2c668', '3d637a81-5cb0-459e-90c1-df77a1438e4e'),
(79, '2860c3bc-1891-4452-821c-e89fe8e2c668', 'b3784eae-b9c6-4804-9970-8913328d067c'),
(80, '2860c3bc-1891-4452-821c-e89fe8e2c668', 'f0f53846-5658-4365-b969-c6e99a350c3f'),
(81, '2860c3bc-1891-4452-821c-e89fe8e2c668', 'fee55fdf-483d-43a4-b304-1b61f9c3e875'),
(82, '2860c3bc-1891-4452-821c-e89fe8e2c668', '68d0c297-e83d-4344-b0c3-a20447e0b6b4'),
(83, '2860c3bc-1891-4452-821c-e89fe8e2c668', '3aa3e409-04f8-4f0e-bfa7-1d8a432a7362'),
(84, '2860c3bc-1891-4452-821c-e89fe8e2c668', '88ce728b-261f-4b04-a8a6-7e6743cf6a2b');

--
-- 已傾印資料表的索引
--

--
-- 資料表索引 `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`accountID`,`productID`);

--
-- 資料表索引 `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`categoryID`);

--
-- 資料表索引 `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`commentID`);

--
-- 資料表索引 `favourites`
--
ALTER TABLE `favourites`
  ADD PRIMARY KEY (`accountID`,`productID`);

--
-- 資料表索引 `following`
--
ALTER TABLE `following`
  ADD PRIMARY KEY (`accountID`,`followingID`);

--
-- 資料表索引 `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`itemID`);

--
-- 資料表索引 `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`transactionID`,`accountID`,`productID`);

--
-- 資料表索引 `photo`
--
ALTER TABLE `photo`
  ADD PRIMARY KEY (`productID`,`img`);

--
-- 資料表索引 `rating`
--
ALTER TABLE `rating`
  ADD PRIMARY KEY (`accountID`,`productID`);

--
-- 資料表索引 `search_history`
--
ALTER TABLE `search_history`
  ADD PRIMARY KEY (`accountID`,`keyword`);

--
-- 資料表索引 `service`
--
ALTER TABLE `service`
  ADD PRIMARY KEY (`serviceID`);

--
-- 資料表索引 `sub_category`
--
ALTER TABLE `sub_category`
  ADD PRIMARY KEY (`subCID`);

--
-- 資料表索引 `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`accountID`),
  ADD UNIQUE KEY `userID` (`userID`);

--
-- 資料表索引 `view_history`
--
ALTER TABLE `view_history`
  ADD PRIMARY KEY (`viewID`);

--
-- 在傾印的資料表使用自動遞增(AUTO_INCREMENT)
--

--
-- 使用資料表自動遞增(AUTO_INCREMENT) `view_history`
--
ALTER TABLE `view_history`
  MODIFY `viewID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
