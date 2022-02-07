import { Stack } from '@mui/material';
import { useMst } from '@sc-onboarding/shape-of-toys/store';
import { observer } from 'mobx-react-lite';
import { SelectedItem } from './SelectedItem';

export const SelectedItemStack = observer(() => {
  const appContext = useMst();
  return (
    <Stack direction="row">
      {appContext.shapes.map(
        (shape) =>
          shape.isSelected && (
            <SelectedItem
              shape={shape}
              removeShape={() => appContext.removeShape(shape.id)}
            />
          )
      )}
    </Stack>
  );
});
