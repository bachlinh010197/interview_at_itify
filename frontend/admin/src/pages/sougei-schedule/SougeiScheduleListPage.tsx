import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import {
  Box,
  Typography,
  Button,
  Select,
  MenuItem,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  Paper,
  Avatar,
  IconButton,
  CircularProgress,
  Dialog,
  DialogContent,
  TextField,
  Chip,
  InputAdornment,
} from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import AddIcon from '@mui/icons-material/Add';
import AccessibleIcon from '@mui/icons-material/Accessible';
import CloseIcon from '@mui/icons-material/Close';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import toast from 'react-hot-toast';
import {
  sougeiSchedulesAtom,
  sougeiSchedulesLoadingAtom,
  sougeiScheduleDateAtom,
  sougeiScheduleTypeFilterAtom,
  sougeiResidenceTypeAtom,
} from '../../atoms/sougeiScheduleAtoms';
import { getSougeiSchedules, createSougeiSchedule } from '../../api/sougeiScheduleApi';
import { getVehicles } from '../../api/vehicleApi';
import { getDrivers } from '../../api/driverApi';
import type { Vehicle } from '../../types/vehicle';
import type { Driver } from '../../types/driver';
import { theme } from '../../styles/theme';

const formatDateJP = (dateStr: string) => {
  const d = new Date(dateStr);
  return `${d.getFullYear()}年${String(d.getMonth() + 1).padStart(2, '0')}月${String(d.getDate()).padStart(2, '0')}日`;
};

const formatDateShortJP = (dateStr: string) => {
  const d = new Date(dateStr);
  return `${String(d.getMonth() + 1).padStart(2, '0')}月${String(d.getDate()).padStart(2, '0')}日`;
};

const SCHEDULE_TYPES = ['全て', 'お迎え', 'お送り'];

const MOCK_STAFF = ['佐藤 花子', '高橋 一郎', '渡辺 美咲', '伊藤 健太', '小林 さくら'];

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

interface CreateForm {
  vehicleId: string;
  scheduleDate: string;
  scheduleType: string;
  startTime: string;
  endTime: string;
  driverId: string;
  staffName: string;
  note: string;
}

const initialForm = (date: string): CreateForm => ({
  vehicleId: '',
  scheduleDate: date,
  scheduleType: '',
  startTime: '',
  endTime: '',
  driverId: '',
  staffName: '',
  note: '',
});

function SougeiScheduleListPage() {
  const navigate = useNavigate();
  const [schedules, setSchedules] = useAtom(sougeiSchedulesAtom);
  const [loading, setLoading] = useAtom(sougeiSchedulesLoadingAtom);
  const [date, setDate] = useAtom(sougeiScheduleDateAtom);
  const [typeFilter, setTypeFilter] = useAtom(sougeiScheduleTypeFilterAtom);
  const [residenceType, setResidenceType] = useAtom(sougeiResidenceTypeAtom);
  const dateInputRef = useRef<HTMLInputElement>(null);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<CreateForm>(initialForm(date));
  const [saving, setSaving] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);

  useEffect(() => {
    const fetchSchedules = async () => {
      setLoading(true);
      try {
        const typeParam = typeFilter === '全て' ? undefined : typeFilter;
        const res = await getSougeiSchedules(date, typeParam);
        setSchedules(res.data);
      } catch {
        toast.error('送迎スケジュールの取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };
    fetchSchedules();
  }, [date, typeFilter, setSchedules, setLoading]);

  const openDialog = async () => {
    setForm(initialForm(date));
    setDialogOpen(true);
    try {
      const [vRes, dRes] = await Promise.all([getVehicles(), getDrivers()]);
      setVehicles(vRes.data);
      setDrivers(dRes.data);
    } catch {
      toast.error('データの取得に失敗しました');
    }
  };

  const handleSave = async () => {
    if (!form.vehicleId || !form.scheduleDate || !form.scheduleType || !form.startTime || !form.driverId) {
      toast.error('必須項目を入力してください');
      return;
    }
    setSaving(true);
    try {
      await createSougeiSchedule({
        userName: '',
        scheduleDate: form.scheduleDate,
        scheduleType: form.scheduleType,
        residenceType: '自宅',
        vehicleId: Number(form.vehicleId),
        driverId: Number(form.driverId),
        scheduledTime: form.startTime || null,
        actualTime: form.endTime || null,
        note: form.note || '',
      });
      toast.success('送迎を登録しました');
      setDialogOpen(false);
      const typeParam = typeFilter === '全て' ? undefined : typeFilter;
      const res = await getSougeiSchedules(date, typeParam);
      setSchedules(res.data);
    } catch {
      toast.error('送迎の登録に失敗しました');
    } finally {
      setSaving(false);
    }
  };

  const changeDate = (days: number) => {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    setDate(d.toISOString().split('T')[0]);
  };

  const filteredSchedules = useMemo(() => {
    return schedules.filter((s) => s.residenceType === residenceType);
  }, [schedules, residenceType]);

  const uniqueUsers = useMemo(() => {
    const seen = new Set<string>();
    return filteredSchedules.filter((s) => {
      if (seen.has(s.userName)) return false;
      seen.add(s.userName);
      return true;
    });
  }, [filteredSchedules]);

  const handleExport = () => {
    toast('この機能は開発中です', { icon: 'ℹ️' });
  };

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h5" fontWeight={700}>
          送迎
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            startIcon={<FileDownloadIcon />}
            onClick={handleExport}
            sx={{
              textTransform: 'none',
              color: theme.colors.danger,
              borderColor: theme.colors.danger,
              '&:hover': { borderColor: theme.colors.dangerHover, bgcolor: 'rgba(239,68,68,0.04)' },
            }}
          >
            実績送迎表のエクセル出力
          </Button>
          <Button
            variant="outlined"
            startIcon={<FileDownloadIcon />}
            onClick={handleExport}
            sx={{ textTransform: 'none', color: '#666', borderColor: '#ccc' }}
          >
            予定送迎表のエクセル出力
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={openDialog}
            sx={{
              bgcolor: theme.colors.accent,
              '&:hover': { bgcolor: theme.colors.accentHover },
              textTransform: 'none',
              fontWeight: 600,
            }}
          >
            送迎登録
          </Button>
        </Box>
      </Box>

      {/* Date navigation */}
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Button
            size="small"
            onClick={() => changeDate(-1)}
            sx={{ textTransform: 'none', color: '#666', minWidth: 'auto' }}
            startIcon={<ChevronLeftIcon />}
          >
            前日
          </Button>
          <Box
            sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer', position: 'relative' }}
            onClick={() => dateInputRef.current?.showPicker()}
          >
            <CalendarMonthIcon sx={{ color: '#666', fontSize: 20 }} />
            <Typography fontWeight={600}>{formatDateJP(date)}</Typography>
            <input
              ref={dateInputRef}
              type="date"
              value={date}
              onChange={(e) => e.target.value && setDate(e.target.value)}
              style={{ position: 'absolute', opacity: 0, width: 0, height: 0, pointerEvents: 'none' }}
            />
          </Box>
          <Button
            size="small"
            onClick={() => changeDate(1)}
            sx={{ textTransform: 'none', color: '#666', minWidth: 'auto' }}
            endIcon={<ChevronRightIcon />}
          >
            翌日
          </Button>
        </Box>
      </Box>

      {/* Main content: two panels */}
      <Box sx={{ display: 'flex', gap: 3 }}>
        {/* Left panel - users */}
        <Paper variant="outlined" sx={{ width: '40%', flexShrink: 0, overflow: 'hidden' }}>
          <Box sx={{ px: 2, py: 1.5, bgcolor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
            <Typography fontWeight={600}>利用者</Typography>
          </Box>

          <Box sx={{ p: 2 }}>
            <RadioGroup
              row
              value={residenceType}
              onChange={(e) => setResidenceType(e.target.value)}
              sx={{ mb: 2 }}
            >
              <FormControlLabel value="自宅" control={<Radio size="small" />} label="自宅" />
              <FormControlLabel value="入所系サービス" control={<Radio size="small" />} label="入所系サービス" />
            </RadioGroup>

            <FormControl fullWidth size="small" sx={{ mb: 2 }}>
              <Select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                displayEmpty
              >
                {SCHEDULE_TYPES.map((t) => (
                  <MenuItem key={t} value={t}>{t === '全て' ? '送迎形態' : t}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl fullWidth size="small" sx={{ mb: 2 }}>
              <Select value="" displayEmpty>
                <MenuItem value="" disabled>市区町村を選択ください</MenuItem>
              </Select>
            </FormControl>

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                <CircularProgress size={28} />
              </Box>
            ) : uniqueUsers.length === 0 ? (
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 4 }}>
                利用者がいません
              </Typography>
            ) : (
              <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
                {uniqueUsers.map((s) => (
                  <Paper
                    key={s.id}
                    variant="outlined"
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      cursor: 'pointer',
                      '&:hover': { bgcolor: '#f9fafb' },
                      position: 'relative',
                    }}
                    onClick={() => navigate(`/sougei-schedule/${s.id}`)}
                  >
                    <AccessibleIcon
                      sx={{ position: 'absolute', top: 8, right: 8, fontSize: 18, color: '#9ca3af' }}
                    />
                    <Avatar sx={{ width: 48, height: 48, bgcolor: '#d1d5db', mb: 1 }} />
                    <Typography variant="body2" fontWeight={500} sx={{ textAlign: 'center' }}>
                      {s.userName}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            )}
          </Box>
        </Paper>

        {/* Right panel - schedule area */}
        <Paper
          variant="outlined"
          sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 400 }}
        >
          <Typography variant="body2" color="text.secondary">
            利用者を選択してスケジュールを表示
          </Typography>
        </Paper>
      </Box>

      {/* 送迎登録 Dialog */}
      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        fullWidth
        maxWidth="lg"
        PaperProps={{ sx: { borderRadius: 2 } }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 3, pt: 3, pb: 1 }}>
          <Typography variant="h6" fontWeight={700}>送迎登録</Typography>
          <IconButton onClick={() => setDialogOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        <DialogContent sx={{ px: 3, pb: 3 }}>
          {/* Row 1: 車両 + 日付 */}
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, mb: 3 }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" fontWeight={600}>車両</Typography>
                <RequiredBadge />
              </Box>
              <FormControl fullWidth size="small">
                <Select
                  value={form.vehicleId}
                  onChange={(e) => setForm((prev) => ({ ...prev, vehicleId: e.target.value }))}
                  displayEmpty
                >
                  <MenuItem value="" disabled>選択してください</MenuItem>
                  {vehicles.map((v) => (
                    <MenuItem key={v.id} value={String(v.id)}>{v.name} ({v.numberPlate})</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" fontWeight={600}>日付</Typography>
                <RequiredBadge />
              </Box>
              <TextField
                fullWidth
                size="small"
                type="date"
                value={form.scheduleDate}
                onChange={(e) => setForm((prev) => ({ ...prev, scheduleDate: e.target.value }))}
              />
            </Box>
          </Box>

          {/* Row 2: 送迎形態 */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Typography variant="body2" fontWeight={600}>送迎形態</Typography>
              <RequiredBadge />
            </Box>
            <RadioGroup
              row
              value={form.scheduleType}
              onChange={(e) => setForm((prev) => ({ ...prev, scheduleType: e.target.value }))}
            >
              <FormControlLabel value="お迎え" control={<Radio size="small" />} label="お迎え" />
              <FormControlLabel value="お送り" control={<Radio size="small" />} label="お送り" />
            </RadioGroup>
          </Box>

          {/* Row 3: 開始時間 + 終了時間 */}
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 2, alignItems: 'end', mb: 3 }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" fontWeight={600}>開始時間</Typography>
                <RequiredBadge />
              </Box>
              <TextField
                fullWidth
                size="small"
                type="time"
                value={form.startTime}
                onChange={(e) => setForm((prev) => ({ ...prev, startTime: e.target.value }))}
                placeholder="--:-- --"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <AccessTimeIcon sx={{ fontSize: 20, color: '#9ca3af' }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>
            <Typography sx={{ pb: 1, color: '#666' }}>〜</Typography>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" fontWeight={600}>終了時間</Typography>
              </Box>
              <TextField
                fullWidth
                size="small"
                type="time"
                value={form.endTime}
                onChange={(e) => setForm((prev) => ({ ...prev, endTime: e.target.value }))}
                placeholder="--:-- --"
                slotProps={{
                  input: {
                    endAdornment: (
                      <InputAdornment position="end">
                        <AccessTimeIcon sx={{ fontSize: 20, color: '#9ca3af' }} />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>
          </Box>

          {/* Row 4: 運転手 + スタッフ */}
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, mb: 3 }}>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" fontWeight={600}>運転手</Typography>
                <RequiredBadge />
              </Box>
              <FormControl fullWidth size="small">
                <Select
                  value={form.driverId}
                  onChange={(e) => setForm((prev) => ({ ...prev, driverId: e.target.value }))}
                  displayEmpty
                >
                  <MenuItem value="" disabled>選択してください</MenuItem>
                  {drivers.map((d) => (
                    <MenuItem key={d.id} value={String(d.id)}>{d.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Typography variant="body2" fontWeight={600}>スタッフ</Typography>
              </Box>
              <FormControl fullWidth size="small">
                <Select
                  value={form.staffName}
                  onChange={(e) => setForm((prev) => ({ ...prev, staffName: e.target.value }))}
                  displayEmpty
                >
                  <MenuItem value="" disabled>選択してください</MenuItem>
                  {MOCK_STAFF.map((name) => (
                    <MenuItem key={name} value={name}>{name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </Box>

          {/* Row 5: メモ */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" fontWeight={600} sx={{ mb: 1 }}>メモ</Typography>
            <TextField
              fullWidth
              size="small"
              multiline
              rows={3}
              placeholder="入力してください"
              value={form.note}
              onChange={(e) => setForm((prev) => ({ ...prev, note: e.target.value }))}
            />
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <Button
              variant="outlined"
              onClick={() => setDialogOpen(false)}
              sx={{ textTransform: 'none', color: '#666', borderColor: '#ccc' }}
            >
              キャンセル
            </Button>
            <Button
              variant="contained"
              onClick={handleSave}
              disabled={saving}
              sx={{
                bgcolor: theme.colors.accent,
                '&:hover': { bgcolor: theme.colors.accentHover },
                textTransform: 'none',
                fontWeight: 600,
              }}
            >
              登録
            </Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default SougeiScheduleListPage;
