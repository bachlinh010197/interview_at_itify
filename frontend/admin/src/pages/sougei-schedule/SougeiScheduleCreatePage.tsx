import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Chip,
  IconButton,
  Collapse,
  Select,
  MenuItem,
  FormControl,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckIcon from '@mui/icons-material/Check';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import toast from 'react-hot-toast';
import { createSougeiSchedule } from '../../api/sougeiScheduleApi';
import type { CreateSougeiScheduleDto } from '../../types/sougeiSchedule';

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

const SCHEDULE_TYPES = ['お迎え', 'お送り'];
const RESIDENCE_TYPES = ['自宅', '入所系サービス'];

function SougeiScheduleCreatePage() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(true);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState<CreateSougeiScheduleDto>({
    userName: '',
    scheduleDate: '',
    scheduleType: '',
    residenceType: '',
    municipality: '',
    scheduledTime: null,
    actualTime: null,
    note: '',
  });

  const handleChange = (field: keyof CreateSougeiScheduleDto, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    if (!form.userName || !form.scheduleDate || !form.scheduleType || !form.residenceType) {
      toast.error('必須項目を入力してください');
      return;
    }
    setSaving(true);
    try {
      await createSougeiSchedule(form);
      toast.success('送迎スケジュールを作成しました');
      navigate('/sougei-schedule');
    } catch {
      toast.error('送迎スケジュールの作成に失敗しました');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton onClick={() => navigate('/sougei-schedule')}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h5" fontWeight={700}>
            送迎登録
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/sougei-schedule')}
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
                <Typography variant="body2" fontWeight={600}>利用者名</Typography>
                <RequiredBadge />
              </Box>
              <TextField
                fullWidth
                size="small"
                value={form.userName}
                onChange={(e) => handleChange('userName', e.target.value)}
              />
            </Box>

            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" fontWeight={600}>送迎日</Typography>
                <RequiredBadge />
              </Box>
              <TextField
                fullWidth
                size="small"
                type="date"
                value={form.scheduleDate}
                onChange={(e) => handleChange('scheduleDate', e.target.value)}
              />
            </Box>

            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" fontWeight={600}>送迎形態</Typography>
                <RequiredBadge />
              </Box>
              <FormControl fullWidth size="small">
                <Select
                  value={form.scheduleType}
                  onChange={(e) => handleChange('scheduleType', e.target.value)}
                  displayEmpty
                >
                  <MenuItem value="" disabled>選択してください</MenuItem>
                  {SCHEDULE_TYPES.map((type) => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" fontWeight={600}>居住形態</Typography>
                <RequiredBadge />
              </Box>
              <FormControl fullWidth size="small">
                <Select
                  value={form.residenceType}
                  onChange={(e) => handleChange('residenceType', e.target.value)}
                  displayEmpty
                >
                  <MenuItem value="" disabled>選択してください</MenuItem>
                  {RESIDENCE_TYPES.map((type) => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" fontWeight={600}>市区町村</Typography>
              </Box>
              <TextField
                fullWidth
                size="small"
                value={form.municipality}
                onChange={(e) => handleChange('municipality', e.target.value)}
              />
            </Box>

            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" fontWeight={600}>予定時刻</Typography>
              </Box>
              <TextField
                fullWidth
                size="small"
                type="time"
                value={form.scheduledTime ?? ''}
                onChange={(e) => handleChange('scheduledTime', e.target.value)}
              />
            </Box>

            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" fontWeight={600}>実績時刻</Typography>
              </Box>
              <TextField
                fullWidth
                size="small"
                type="time"
                value={form.actualTime ?? ''}
                onChange={(e) => handleChange('actualTime', e.target.value)}
              />
            </Box>

            <Box sx={{ gridColumn: '1 / -1' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" fontWeight={600}>備考</Typography>
              </Box>
              <TextField
                fullWidth
                size="small"
                multiline
                rows={3}
                value={form.note}
                onChange={(e) => handleChange('note', e.target.value)}
              />
            </Box>
          </Box>
        </Collapse>
      </Paper>
    </Box>
  );
}

export default SougeiScheduleCreatePage;
