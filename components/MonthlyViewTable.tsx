import { Table, Thead, Tbody, Tr, Th, Td, Text } from "@chakra-ui/react";
import { MonthlyViewData } from "../services/MonthlyViewService";

interface Props {
  data: MonthlyViewData;
}

const NODATA_LABEL = "NO DATA";

function toYenString(value: number | null): string {
  return value ? `￥ ${value.toLocaleString("ja-JP")}` : NODATA_LABEL;
}

function renderRow(
  label: string,
  current: number | null,
  oneYearBefore: number | null
) {
  const curStr = toYenString(current);
  const oneYrB4Str = toYenString(oneYearBefore);
  const textColor = (v: string) => {
    return v === NODATA_LABEL ? "gray" : "black";
  };

  return (
    <Tr>
      <Td>
        <Text align="center">{label}</Text>
      </Td>
      <Td isNumeric>
        <Text color={textColor(curStr)}>{curStr}</Text>
      </Td>
      <Td isNumeric>
        <Text color={textColor(oneYrB4Str)}>{oneYrB4Str}</Text>
      </Td>
    </Tr>
  );
}

const MonthlyViewTable: React.FC<Props> = ({ data }) => {
  const { current, oneYearBefore } = data;
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>
            <Text align="center" fontSize="md">
              項目
            </Text>
          </Th>
          <Th>
            <Text align="center" fontSize="md">
              今月
            </Text>
          </Th>
          <Th>
            <Text align="center" fontSize="md">
              １年前
            </Text>
          </Th>
        </Tr>
      </Thead>
      <Tbody>
        {renderRow("住宅費", current.housing, oneYearBefore.housing)}
        {renderRow("電気代", current.electric, oneYearBefore.electric)}
        {renderRow("ガス代", current.gas, oneYearBefore.gas)}
        {renderRow("水道代", current.hydro, oneYearBefore.hydro)}
        {renderRow("食費", current.grocery, oneYearBefore.grocery)}
        {renderRow("雑費", current.others, oneYearBefore.others)}
      </Tbody>
    </Table>
  );
};

export default MonthlyViewTable;
