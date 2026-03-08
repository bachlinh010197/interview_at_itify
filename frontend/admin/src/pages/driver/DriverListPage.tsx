import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import {
  Box,
  Typography,
  TextField,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  InputAdornment,
  CircularProgress,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import toast from 'react-hot-toast';
import { driversAtom, driversLoadingAtom, driverSearchAtom } from '../../atoms/driverAtoms';
import { getDrivers } from '../../api/driverApi';
import { theme } from '../../styles/theme';

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr);
  return `${d.getFullYear()}年${String(d.getMonth() + 1).padStart(2, '0')}月${String(d.getDate()).padStart(2, '0')}日`;
};

function DriverListPage() {
  const navigate = useNavigate();
  const [drivers, setDrivers] = useAtom(driversAtom);
  const [loading, setLoading] = useAtom(driversLoadingAtom);
  const [search, setSearch] = useAtom(driverSearchAtom);

  useEffect(() => {
    const fetchDrivers = async () => {
      setLoading(true);
      try {
        const res = await getDrivers();
        setDrivers(res.data);
      } catch {
        toast.error('運転者一覧の取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };
    fetchDrivers();
  }, [setDrivers, setLoading]);

  const filtered = useMemo(() => {
    if (!search) return drivers;
    const q = search.toLowerCase();
    return drivers.filter(
      (v) =>
        v.name.toLowerCase().includes(q) ||
        v.licenseNumber.toLowerCase().includes(q) ||
        v.licenseType.toLowerCase().includes(q),
    );
  }, [drivers, search]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
        運転者一覧
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <TextField
          size="small"
          placeholder="検索"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon fontSize="small" />
                </InputAdornment>
              ),
            },
          }}
          sx={{ width: 300 }}
        />
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/driver/create')}
          sx={{
            bgcolor: theme.colors.accent,
            '&:hover': { bgcolor: theme.colors.accentHover },
            textTransform: 'none',
            fontWeight: 600,
          }}
        >
          運転者追加
        </Button>
      </Box>

      <Paper variant="outlined">
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#f9fafb' }}>
              <TableCell sx={{ fontWeight: 600 }}>運転者名</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>免許証番号</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>免許種類</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>免許交付日</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>免許有効期限</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                  <CircularProgress size={28} />
                </TableCell>
              </TableRow>
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4, color: 'text.secondary' }}>
                  データがありません
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((v) => (
                <TableRow key={v.id} hover>
                  <TableCell>
                    <Box
                      component="span"
                      sx={{
                        color: theme.colors.primary,
                        cursor: 'pointer',
                        '&:hover': { textDecoration: 'underline' },
                      }}
                      onClick={() => navigate(`/driver/${v.id}`)}
                    >
                      {v.name}
                    </Box>
                  </TableCell>
                  <TableCell>{v.licenseNumber}</TableCell>
                  <TableCell>{v.licenseType}</TableCell>
                  <TableCell>{formatDate(v.licenseIssuedDate)}</TableCell>
                  <TableCell>{formatDate(v.licenseExpiryDate)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}

export default DriverListPage;
