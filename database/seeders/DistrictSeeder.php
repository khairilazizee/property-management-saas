<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DistrictSeeder extends Seeder
{
    private const DISTRICTS = [
        ['district_code' => '0900', 'state_id' => 9, 'name' => 'PERLIS'],
        ['district_code' => '0201', 'state_id' => 2, 'name' => 'KOTA SETAR'],
        ['district_code' => '0202', 'state_id' => 2, 'name' => 'KUBANG PASU'],
        ['district_code' => '0203', 'state_id' => 2, 'name' => 'PADANG TERAP'],
        ['district_code' => '0204', 'state_id' => 2, 'name' => 'LANGKAWI'],
        ['district_code' => '0205', 'state_id' => 2, 'name' => 'KUALA MUDA'],
        ['district_code' => '0206', 'state_id' => 2, 'name' => 'YAN'],
        ['district_code' => '0207', 'state_id' => 2, 'name' => 'SIK'],
        ['district_code' => '0208', 'state_id' => 2, 'name' => 'BALING'],
        ['district_code' => '0209', 'state_id' => 2, 'name' => 'KULIM'],
        ['district_code' => '0210', 'state_id' => 2, 'name' => 'BANDAR BAHARU'],
        ['district_code' => '0211', 'state_id' => 2, 'name' => 'PENDANG'],
        ['district_code' => '0212', 'state_id' => 2, 'name' => 'POKOK SENA'],
        ['district_code' => '0301', 'state_id' => 3, 'name' => 'BACHOK'],
        ['district_code' => '0302', 'state_id' => 3, 'name' => 'KOTA BHARU'],
        ['district_code' => '0303', 'state_id' => 3, 'name' => 'MACHANG'],
        ['district_code' => '0304', 'state_id' => 3, 'name' => 'PASIR MAS'],
        ['district_code' => '0305', 'state_id' => 3, 'name' => 'PASIR PUTEH'],
        ['district_code' => '0306', 'state_id' => 3, 'name' => 'TANAH MERAH'],
        ['district_code' => '0307', 'state_id' => 3, 'name' => 'TUMPAT'],
        ['district_code' => '0308', 'state_id' => 3, 'name' => 'GUA MUSANG'],
        // ['district_code' => '0309', 'state_id' => 3, 'name' => '??'],
        ['district_code' => '0310', 'state_id' => 3, 'name' => 'KUALA KRAI'],
        ['district_code' => '0311', 'state_id' => 3, 'name' => 'JELI'],
        ['district_code' => '0312', 'state_id' => 3, 'name' => 'KECIL LOJING'],
        ['district_code' => '1101', 'state_id' => 11, 'name' => 'BESUT'],
        ['district_code' => '1102', 'state_id' => 11, 'name' => 'DUNGUN'],
        ['district_code' => '1103', 'state_id' => 11, 'name' => 'KEMAMAN'],
        ['district_code' => '1104', 'state_id' => 11, 'name' => 'KUALA TERENGGANU'],
        ['district_code' => '1105', 'state_id' => 11, 'name' => 'HULU TERENGGANU'],
        ['district_code' => '1106', 'state_id' => 11, 'name' => 'MARANG'],
        ['district_code' => '1107', 'state_id' => 11, 'name' => 'SETIU'],
        ['district_code' => '1108', 'state_id' => 11, 'name' => 'KUALA NERUS'],

        // pulau pinang
        ['district_code' => '0701', 'state_id' => 7, 'name' => 'SEBERANG PERAI TENGAH'],
        ['district_code' => '0702', 'state_id' => 7, 'name' => 'SEBERANG PERAI UTARA'],
        ['district_code' => '0703', 'state_id' => 7, 'name' => 'SEBERANG PERAI SELATAN'],
        ['district_code' => '0704', 'state_id' => 7, 'name' => 'TIMOR LAUT'],
        ['district_code' => '0705', 'state_id' => 7, 'name' => 'BARAT DAYA'],

        // perak
        ['district_code' => '0801', 'state_id' => 8, 'name' => 'BATANG PADANG'],
        ['district_code' => '0802', 'state_id' => 8, 'name' => 'MANJUNG'],
        ['district_code' => '0803', 'state_id' => 8, 'name' => 'KINTA'],
        ['district_code' => '0804', 'state_id' => 8, 'name' => 'KERIAN'],
        ['district_code' => '0805', 'state_id' => 8, 'name' => 'KUALA KANGSAR'],
        ['district_code' => '0806', 'state_id' => 8, 'name' => 'LARUT & MATANG'],
        ['district_code' => '0807', 'state_id' => 8, 'name' => 'HILIR PERAK'],
        ['district_code' => '0808', 'state_id' => 8, 'name' => 'HULU PERAK'],
        ['district_code' => '0809', 'state_id' => 8, 'name' => 'SELAMA'],
        ['district_code' => '0810', 'state_id' => 8, 'name' => 'PERAK TENGAH'],
        ['district_code' => '0811', 'state_id' => 8, 'name' => 'KAMPAR'],
        // ['district_code' => '0812', 'state_id' => 8, 'name' => 'MUALLIM'],

        // pahang
        ['district_code' => '0601', 'state_id' => 6, 'name' => 'BENTONG'],
        ['district_code' => '0602', 'state_id' => 6, 'name' => 'CAMERON HIGHLANDS'],
        ['district_code' => '0603', 'state_id' => 6, 'name' => 'JERANTUT'],
        ['district_code' => '0604', 'state_id' => 6, 'name' => 'KUANTAN'],
        ['district_code' => '0605', 'state_id' => 6, 'name' => 'LIPIS'],
        ['district_code' => '0606', 'state_id' => 6, 'name' => 'PEKAN'],
        ['district_code' => '0607', 'state_id' => 6, 'name' => 'RAUB'],
        ['district_code' => '0608', 'state_id' => 6, 'name' => 'TEMERLOH'],
        ['district_code' => '0609', 'state_id' => 6, 'name' => 'ROMPIN'],
        ['district_code' => '0610', 'state_id' => 6, 'name' => 'MARAN'],
        ['district_code' => '0611', 'state_id' => 6, 'name' => 'BERA'],

        // selangor
        ['district_code' => '1001', 'state_id' => 10, 'name' => 'KLANG'],
        ['district_code' => '1002', 'state_id' => 10, 'name' => 'KUALA LANGAT'],
        // ['district_code' => '1003', 'state_id' => 10, 'name' => '??'],
        ['district_code' => '1004', 'state_id' => 10, 'name' => 'KUALA SELANGOR'],
        ['district_code' => '1005', 'state_id' => 10, 'name' => 'SABAK BERNAM'],
        ['district_code' => '1006', 'state_id' => 10, 'name' => 'ULU LANGAT'],
        ['district_code' => '1007', 'state_id' => 10, 'name' => 'ULU SELANGOR'],
        ['district_code' => '1008', 'state_id' => 10, 'name' => 'PETALING'],
        ['district_code' => '1009', 'state_id' => 10, 'name' => 'GOMBAK'],
        ['district_code' => '1010', 'state_id' => 10, 'name' => 'SEPANG'],

        // kuala lumpur - tiada daerah.
        ['district_code' => '1400', 'state_id' => 14, 'name' => 'W. P. KUALA LUMPUR'],

        // putrajaya
        ['district_code' => '1601', 'state_id' => 16, 'name' => 'W. P. PUTRAJAYA'],

        // negeri sembilan
        ['district_code' => '0501', 'state_id' => 5, 'name' => 'JELEBU'],
        ['district_code' => '0502', 'state_id' => 5, 'name' => 'KUALA PILAH'],
        ['district_code' => '0503', 'state_id' => 5, 'name' => 'PORT DICKSON'],
        ['district_code' => '0504', 'state_id' => 5, 'name' => 'REMBAU'],
        ['district_code' => '0505', 'state_id' => 5, 'name' => 'SEREMBAN'],
        ['district_code' => '0506', 'state_id' => 5, 'name' => 'TAMPIN'],
        ['district_code' => '0507', 'state_id' => 5, 'name' => 'JEMPOL'],

        // melaka
        ['district_code' => '0401', 'state_id' => 4, 'name' => 'MELAKA TENGAH'],
        ['district_code' => '0402', 'state_id' => 4, 'name' => 'JASIN'],
        ['district_code' => '0403', 'state_id' => 4, 'name' => 'ALOR GAJAH'],

        // johor
        ['district_code' => '0101', 'state_id' => 1, 'name' => 'BATU PAHAT'],
        ['district_code' => '0102', 'state_id' => 1, 'name' => 'JOHOR BAHRU'],
        ['district_code' => '0103', 'state_id' => 1, 'name' => 'KLUANG'],
        ['district_code' => '0104', 'state_id' => 1, 'name' => 'KOTA TINGGI'],
        ['district_code' => '0105', 'state_id' => 1, 'name' => 'MERSING'],
        ['district_code' => '0106', 'state_id' => 1, 'name' => 'MUAR'],
        ['district_code' => '0107', 'state_id' => 1, 'name' => 'PONTIAN'],
        ['district_code' => '0108', 'state_id' => 1, 'name' => 'SEGAMAT'],
        ['district_code' => '0109', 'state_id' => 1, 'name' => 'KULAIJAYA'],
        ['district_code' => '0110', 'state_id' => 1, 'name' => 'LEDANG'],

        // labuan - tiada daerah
        ['district_code' => '1500', 'state_id' => 15, 'name' => 'W. P. LABUAN'],

        // sabah
        ['district_code' => '1201', 'state_id' => 12, 'name' => 'KOTA KINABALU'],
        ['district_code' => '1202', 'state_id' => 12, 'name' => 'PAPAR'],
        ['district_code' => '1203', 'state_id' => 12, 'name' => 'KOTA BELUD'],
        ['district_code' => '1204', 'state_id' => 12, 'name' => 'TUARAN'],
        ['district_code' => '1205', 'state_id' => 12, 'name' => 'KUDAT'],
        ['district_code' => '1206', 'state_id' => 12, 'name' => 'RANAU'],
        ['district_code' => '1207', 'state_id' => 12, 'name' => 'SANDAKAN'],
        ['district_code' => '1208', 'state_id' => 12, 'name' => 'LABUK & SUGUT'],
        ['district_code' => '1209', 'state_id' => 12, 'name' => 'KINABATANGAN'],
        ['district_code' => '1210', 'state_id' => 12, 'name' => 'TAWAU'],
        ['district_code' => '1211', 'state_id' => 12, 'name' => 'LAHAD DATU'],
        ['district_code' => '1212', 'state_id' => 12, 'name' => 'SEMPORNA'],
        ['district_code' => '1213', 'state_id' => 12, 'name' => 'KENINGAU'],
        ['district_code' => '1214', 'state_id' => 12, 'name' => 'TAMBUNAN'],
        ['district_code' => '1215', 'state_id' => 12, 'name' => 'PENSIANGAN'],
        ['district_code' => '1216', 'state_id' => 12, 'name' => 'TENOM'],
        ['district_code' => '1217', 'state_id' => 12, 'name' => 'BEAUFORT'],
        ['district_code' => '1218', 'state_id' => 12, 'name' => 'KUALA PENYU'],
        ['district_code' => '1219', 'state_id' => 12, 'name' => 'SIPITANG'],
        // ['district_code' => '1220', 'state_id' => 12, 'name' => '??'],
        ['district_code' => '1221', 'state_id' => 12, 'name' => 'PENAMPANG'],
        ['district_code' => '1222', 'state_id' => 12, 'name' => 'KOTA MARUDU'],
        ['district_code' => '1223', 'state_id' => 12, 'name' => 'PITAS'],
        ['district_code' => '1224', 'state_id' => 12, 'name' => 'KUNAK'],
        ['district_code' => '1225', 'state_id' => 12, 'name' => 'TONGOD'],
        ['district_code' => '1226', 'state_id' => 12, 'name' => 'PUTATAN'],

        // sarawak
        ['district_code' => '1301', 'state_id' => 13, 'name' => 'KUCHING'],
        ['district_code' => '1302', 'state_id' => 13, 'name' => 'SRI AMAN'],
        ['district_code' => '1303', 'state_id' => 13, 'name' => 'SIBU'],
        ['district_code' => '1304', 'state_id' => 13, 'name' => 'MIRI'],
        ['district_code' => '1305', 'state_id' => 13, 'name' => 'LIMBANG'],
        ['district_code' => '1306', 'state_id' => 13, 'name' => 'SARIKEI'],
        ['district_code' => '1307', 'state_id' => 13, 'name' => 'KAPIT'],
        ['district_code' => '1308', 'state_id' => 13, 'name' => 'SAMARAHAN'],
        ['district_code' => '1309', 'state_id' => 13, 'name' => 'BINTULU'],
        ['district_code' => '1310', 'state_id' => 13, 'name' => 'MUKAH'],
        ['district_code' => '1311', 'state_id' => 13, 'name' => 'BETONG'],
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('districts')->delete();
        DB::table('districts')->insert(self::DISTRICTS);
    }
}
