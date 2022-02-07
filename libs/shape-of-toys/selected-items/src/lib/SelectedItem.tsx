import DeleteIcon from '@mui/icons-material/Delete';
import { Card, CardContent, IconButton, Slider, Stack } from '@mui/material';
import { observer } from 'mobx-react-lite';
import { getType } from 'mobx-state-tree';
import { SwatchesPicker } from 'react-color';

export const SelectedItem = observer(({ shape, removeShape }: any) => {
  const shapeType = getType(shape).name;
  return (
    <Card>
      <CardContent>
        <Stack direction="row" justifyContent="space-between">
          <p>{shapeType}</p>
          <IconButton
            color="error"
            onClick={() => {
              removeShape(shape);
            }}
          >
            <DeleteIcon></DeleteIcon>
          </IconButton>
        </Stack>
        {shapeType === 'circle' ? (
          <div>
            <Stack direction="row" justifyContent="space-between">
              <p>Center X: {shape.x}</p>
              <p>Center Y: {shape.y}</p>
            </Stack>
            <p>Radius: {shape.radius}</p>
            <Slider
              value={shape.radius}
              defaultValue={shape.radius}
              step={1}
              marks
              min={10}
              max={100}
              onChange={(e: any) => {
                shape.updateRadius(e.target.value);
              }}
            />
          </div>
        ) : (
          <div>
            <Stack direction="row" justifyContent="space-between">
              <p>X: {shape.x}</p>
              <p>Y: {shape.y}</p>
            </Stack>
            <p>Height: {shape.height}</p>
            <Slider
              value={shape.height}
              defaultValue={shape.height}
              step={1}
              marks
              min={20}
              max={200}
              onChange={(e: any) => {
                shape.updateHeight(e.target.value);
              }}
            />
            <p>Width: {shape.width}</p>
            <Slider
              value={shape.width}
              defaultValue={shape.width}
              step={1}
              marks
              min={20}
              max={200}
              onChange={(e: any) => {
                shape.updateWidth(e.target.value);
              }}
            />
          </div>
        )}
        <SwatchesPicker
          color={shape.color}
          onChangeComplete={(color) => {
            const rgbObj = color.rgb;
            shape.updateColor(`rgba(${rgbObj.r},${rgbObj.g},${rgbObj.b})`);
          }}
        />
      </CardContent>
    </Card>
  );
});
