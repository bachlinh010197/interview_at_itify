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
import { vehiclesAtom, vehiclesLoadingAtom, vehicleSearchAtom } from '../../atoms/vehicleAtoms';
import { getVehicles } from '../../api/vehicleApi';
import { theme } from '../../styles/theme';

function VehicleListPage() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useAtom(vehiclesAtom);
  const [loading, setLoading] = useAtom(vehiclesLoadingAtom);
  const [search, setSearch] = useAtom(vehicleSearchAtom);

  useEffect(() => {
    const fetchVehicles = async () => {
      setLoading(true);
      try {
        const res = await getVehicles();
        setVehicles(res.data);
      } catch {
        toast.error('車両一覧の取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };
    fetchVehicles();
  }, [setVehicles, setLoading]);

  const filtered = useMemo(() => {
    if (!search) return vehicles;
    const q = search.toLowerCase();
    return vehicles.filter(
      (v) =>
        v.name.toLowerCase().includes(q) ||
        v.numberPlate.toLowerCase().includes(q) ||
        v.responsible.toLowerCase().includes(q),
    );
  }, [vehicles, search]);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
        車両一覧
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
          onClick={() => navigate('/vehicle/create')}
          sx={{
            bgcolor: theme.colors.accent,
            '&:hover': { bgcolor: theme.colors.accentHover },
            textTransform: 'none',
            fontWeight: 600,
          }}
        >
          車両追加
        </Button>
      </Box>

      <Paper variant="outlined">
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: '#f9fafb' }}>
              <TableCell sx={{ fontWeight: 600 }}>車両名</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>ナンバープレート</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>座席数</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>車椅子</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>責任者</TableCell>
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
                      onClick={() => navigate(`/vehicle/${v.id}`)}
                    >
                      {v.name}
                    </Box>
                  </TableCell>
                  <TableCell>{v.numberPlate}</TableCell>
                  <TableCell>{v.seatCount}</TableCell>
                  <TableCell>{v.hasWheelchair ? 'あり' : 'なし'}</TableCell>
                  <TableCell>{v.responsible}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}

export default VehicleListPage;
