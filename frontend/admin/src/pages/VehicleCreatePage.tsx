import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Paper,
  Chip,
  IconButton,
  Collapse,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import toast from 'react-hot-toast';
import { createVehicle } from '../api/vehicleApi';
import type { CreateVehicleDto } from '../types/vehicle';

const RequiredBadge = () => (
  <Chip
    label="必須"
    size="small"
    sx={{
      bgcolor: '#ef4444',
      color: '#fff',
      fontSize: '0.7rem',
      height: 20,
      ml: 1,
    }}
  />
);

function VehicleCreatePage() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<CreateVehicleDto>({
    name: '',
    numberPlate: '',
    seatCount: 0,
    hasWheelchair: false,
    responsible: '',
  });

  const handleChange = (field: keyof CreateVehicleDto, value: string | number | boolean) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!form.name || !form.numberPlate || !form.responsible) {
      toast.error('必須項目を入力してください');
      return;
    }
    setSaving(true);
    try {
      await createVehicle(form);
      toast.success('車両を作成しました');
      navigate('/vehicle');
    } catch {
      toast.error('車両の作成に失敗しました');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton onClick={() => navigate('/vehicle')}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" fontWeight={700}>
            車両情報
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/vehicle')}
            sx={{ textTransform: 'none', color: '#666', borderColor: '#ccc' }}
          >
            キャンセル
          </Button>
          <Button
            variant="contained"
            startIcon={<CheckIcon />}
            onClick={handleSave}
            disabled={saving}
            sx={{
              bgcolor: '#22c55e',
              '&:hover': { bgcolor: '#16a34a' },
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            保存
          </Button>
        </Box>
      </Box>

      <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 2,
            py: 1.5,
            bgcolor: '#f9fafb',
            cursor: 'pointer',
            borderBottom: expanded ? '1px solid #e5e7eb' : 'none',
          }}
          onClick={() => setExpanded(!expanded)}
        >
          <Typography fontWeight={600}>基本情報</Typography>
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Box>

        <Collapse in={expanded}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 3,
              p: 3,
            }}
          >
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" fontWeight={600}>車両名</Typography>
                <RequiredBadge />
              </Box>
              <TextField
                fullWidth
                size="small"
                value={form.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </Box>

            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" fontWeight={600}>ナンバープレート</Typography>
                <RequiredBadge />
              </Box>
              <TextField
                fullWidth
                size="small"
                value={form.numberPlate}
                onChange={(e) => handleChange('numberPlate', e.target.value)}
              />
            </Box>

            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" fontWeight={600}>座席数</Typography>
                <RequiredBadge />
              </Box>
              <TextField
                fullWidth
                size="small"
                type="number"
                value={form.seatCount}
                onChange={(e) => handleChange('seatCount', Number(e.target.value))}
                slotProps={{ htmlInput: { min: 0 } }}
              />
            </Box>

            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" fontWeight={600}>責任者</Typography>
                <RequiredBadge />
              </Box>
              <TextField
                fullWidth
                size="small"
                value={form.responsible}
                onChange={(e) => handleChange('responsible', e.target.value)}
              />
            </Box>

            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" fontWeight={600}>車椅子</Typography>
                <RequiredBadge />
              </Box>
              <RadioGroup
                row
                value={form.hasWheelchair ? 'true' : 'false'}
                onChange={(e) => handleChange('hasWheelchair', e.target.value === 'true')}
              >
                <FormControlLabel value="false" control={<Radio size="small" />} label="なし" />
                <FormControlLabel value="true" control={<Radio size="small" />} label="あり" />
              </RadioGroup>
            </Box>
          </Box>
        </Collapse>
      </Paper>
    </Box>
  );
}

export default VehicleCreatePage;
