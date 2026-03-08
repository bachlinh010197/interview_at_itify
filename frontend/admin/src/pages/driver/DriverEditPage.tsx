import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Chip,
  IconButton,
  Collapse,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import toast from 'react-hot-toast';
import { getDriver, updateDriver } from '../../api/driverApi';
import type { CreateDriverDto } from '../../types/driver';

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

const LICENSE_TYPES = [
  '普通自動車免許',
  '準中型自動車免許',
  '中型自動車免許',
  '大型自動車免許',
];

function DriverEditPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [expanded, setExpanded] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<CreateDriverDto>({
    name: '',
    phone: '',
    address: '',
    licenseNumber: '',
    licenseType: '',
    licenseIssuedDate: '',
    licenseExpiryDate: '',
  });

  useEffect(() => {
    const fetchDriver = async () => {
      try {
        const res = await getDriver(Number(id));
        const v = res.data;
        setForm({
          name: v.name,
          phone: v.phone,
          address: v.address,
          licenseNumber: v.licenseNumber,
          licenseType: v.licenseType,
          licenseIssuedDate: v.licenseIssuedDate,
          licenseExpiryDate: v.licenseExpiryDate,
        });
      } catch {
        toast.error('運転者情報の取得に失敗しました');
        navigate('/driver');
      } finally {
        setLoading(false);
      }
    };
    fetchDriver();
  }, [id, navigate]);

  const handleChange = (field: keyof CreateDriverDto, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!form.name || !form.licenseNumber || !form.licenseType || !form.licenseIssuedDate || !form.licenseExpiryDate) {
      toast.error('必須項目を入力してください');
      return;
    }
    setSaving(true);
    try {
      await updateDriver(Number(id), form);
      toast.success('運転者を更新しました');
      navigate('/driver');
    } catch {
      toast.error('運転者の更新に失敗しました');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: 400 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton onClick={() => navigate('/driver')}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" fontWeight={700}>
            運転者情報
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/driver')}
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
                <Typography variant="body2" fontWeight={600}>運転者名</Typography>
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
                <Typography variant="body2" fontWeight={600}>電話番号</Typography>
              </Box>
              <TextField
                fullWidth
                size="small"
                value={form.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
              />
            </Box>

            <Box sx={{ gridColumn: '1 / -1' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" fontWeight={600}>住所</Typography>
              </Box>
              <TextField
                fullWidth
                size="small"
                multiline
                rows={3}
                value={form.address}
                onChange={(e) => handleChange('address', e.target.value)}
              />
            </Box>

            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" fontWeight={600}>免許証番号</Typography>
                <RequiredBadge />
              </Box>
              <TextField
                fullWidth
                size="small"
                value={form.licenseNumber}
                onChange={(e) => handleChange('licenseNumber', e.target.value)}
              />
            </Box>

            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" fontWeight={600}>免許種類</Typography>
                <RequiredBadge />
              </Box>
              <FormControl fullWidth size="small">
                <Select
                  value={form.licenseType}
                  onChange={(e) => handleChange('licenseType', e.target.value)}
                  displayEmpty
                >
                  <MenuItem value="" disabled>選択してください</MenuItem>
                  {LICENSE_TYPES.map((type) => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" fontWeight={600}>免許交付日</Typography>
                <RequiredBadge />
              </Box>
              <TextField
                fullWidth
                size="small"
                type="date"
                value={form.licenseIssuedDate}
                onChange={(e) => handleChange('licenseIssuedDate', e.target.value)}
              />
            </Box>

            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" fontWeight={600}>免許有効期限</Typography>
                <RequiredBadge />
              </Box>
              <TextField
                fullWidth
                size="small"
                type="date"
                value={form.licenseExpiryDate}
                onChange={(e) => handleChange('licenseExpiryDate', e.target.value)}
              />
            </Box>
          </Box>
        </Collapse>
      </Paper>
    </Box>
  );
}

export default DriverEditPage;
