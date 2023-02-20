import React, { useMemo } from "react";
import { Add } from "@mui/icons-material";
import { useTable } from "@pankod/refine-core";
import {
  Typography,
  Box,
  Stack,
  Select,
  TextField,
  MenuItem,
} from "@pankod/refine-mui";
import { useNavigate } from "@pankod/refine-react-router-v6";
import { PropertyCard, CustomButton } from "components";

const AllProperties = () => {
  const navigate = useNavigate();

  // useTable hook returns tableQueryResult which contains data, isLoading and isError
  const {
    tableQueryResult: { data, isLoading, isError },
    current,
    setCurrent,
    setPageSize,
    pageCount,
    sorter,
    setSorter,
    filters,
    setFilters,
  } = useTable();

  const allProperties = data?.data ?? [];

  const currentPrice = sorter.find((item) => item.field === "price")?.order;

  const toggleSort = (field: string) => {
    setSorter([{ field, order: currentPrice === "asc" ? "desc" : "asc" }]);
  };

  const currentFilterValues = useMemo(() => {
    const logicalFilters = filters.flatMap((item) =>
      "field" in item ? item : []
    );

    return {
      title: logicalFilters.find((item) => item.field === "title")?.value || "",
      propertyType: logicalFilters.find((item) => item.field === "propertyType")?.value || "",
    };
  }, [filters]);

  if (isLoading) {
    return <Typography>Loading...</Typography>;
  }

  if (isError) {
    return <Typography>Something went wrong!</Typography>;
  }

  return (
    <Box>
      <Box mt="20px" sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        <Stack direction={"column"} width={"100%"}>
          <Typography fontSize={25} fontWeight={700} color="#11142D">
            {!allProperties.length ? "No Properties Found" : "All Properties"}
          </Typography>

          <Box
            mb={2}
            mt={3}
            display={"flex"}
            width={"84%"}
            justifyContent={"space-between"}
            flexWrap={"wrap"}>
            <Box display={"flex"} flexWrap={"wrap"} mb={{ xs: "20px", sm: 0 }}>
              <CustomButton
                title={`Sort Price ${currentPrice === "asc" ? "↑" : "↓"}`}
                handleClick={() => toggleSort("price")}
                backgroundColor={"#475be8"}
                color={"#fcfcfc"}
              />
              <TextField
                variant="outlined"
                color="info"
                placeholder="Search by title"
                value={currentFilterValues.title}
                onChange={(e) => {
                  setFilters([
                      {
                          field: "title",
                          operator: "contains",
                          value: e.currentTarget.value
                              ? e.currentTarget.value
                              : undefined,
                      },
                  ]);
              }}
              />
              <Select
                variant="outlined"
                color="info"
                displayEmpty
                required
                inputProps={{ "aria-label": "Without label" }}
                defaultValue={""}
                value={currentFilterValues.propertyType}
                onChange={(e) => {
                  setFilters([
                      {
                          field: "propertyType",
                          operator: "eq",
                          value: e.target.value
                      },
                  ], 'replace');
              }}>
                <MenuItem value="">
                  All{" "}
                </MenuItem>
                {['Apartment', 'House', 'Villa', 'Farm House', 'Town House', 'Duplex', 'Studio', 'Chalet'].map((type) => (
                  <MenuItem key={type} value={type.toLowerCase()}>{type}</MenuItem>
                ))}
              </Select>
            </Box>
          </Box>
        </Stack>
      </Box>

      <Stack
        direction="row"
        justifyContent={"space-between"}
        alignItems={"center"}>
        <CustomButton
          title="Add Property"
          handleClick={() => navigate("/properties/create")}
          backgroundColor="#475be8"
          color="#fcfcfc"
          icon={<Add />}
        />
      </Stack>
      <Box mt={"20px"} sx={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
        {allProperties.map((property) => (
          <PropertyCard
            key={property._id}
            id={property._id}
            location={property.location}
            price={property.price}
            title={property.title}
            photo={property.photo}
          />
        ))}
      </Box>

      {
        /* Pagination */ allProperties.length > 0 && (
          <Box mt={3} display={"flex"} gap={2} flexWrap={"wrap"}>
            <CustomButton
              disabled={!(current > 1)}
              color="#fcfcfc"
              backgroundColor="#475be8"
              title="Previous"
              handleClick={() => setCurrent((prev) => prev - 1)}
            />
            <Box
              alignItems="center"
              gap="5px"
              display={{ xs: "hidden", sm: "flex" }}>
              Page{" "}
              <strong>
                {current} of {pageCount}
              </strong>
            </Box>
            <CustomButton
              disabled={current === pageCount}
              color={"#fcfcfc"}
              backgroundColor="#475be8"
              title="Next"
              handleClick={() => setCurrent((prev) => prev + 1)}
            />
            <Select
              variant="outlined"
              color="info"
              displayEmpty
              required
              inputProps={{ "aria-label": "Without label" }}
              defaultValue={10}
              onChange={(e) => setPageSize(e.target.value ? Number(e.target.value) : 10)}>
              {[10, 20, 30, 40, 50].map((size) => (
                <MenuItem key={size} value={size}>
                  Show {size}
                </MenuItem>
              ))}
            </Select>
          </Box>
        )
      }
    </Box>
  );
};

export default AllProperties;
