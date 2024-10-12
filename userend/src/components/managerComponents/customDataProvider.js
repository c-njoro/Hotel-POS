import axios from "axios";
const apiUrl = process.env.NEXT_PUBLIC_BASE_URL_FOR_ADMIN;

const customDataProvider = {
  //get whole list
  getList: (resource, params) => {
    const {
      name,
      price,
      servingTime,
      cuisineType,
      category,
      waiter,
      table,
      role,
      orderStatus,
      paymentStatus,
    } = params.filter;
    let query = `${apiUrl}/${resource}?`;

    if (role) {
      query += `role=${role}&`;
    }
    if (category) {
      query += `category=${category}&`;
    }
    if (name) {
      query += `name=${name}&`; //getting one
    }
    if (waiter) {
      query += `waiter=${waiter}&`;
    }
    if (table) {
      query += `table=${table}&`;
    }

    if (cuisineType) {
      query += `cuisineType=${cuisineType}&`;
    }

    if (servingTime) {
      query += `servingTime=${servingTime}&`;
    }

    if (price) {
      query += `price=${price}&`;
    }

    if (orderStatus) {
      query += `orderStatus=${orderStatus}&`;
    }

    if (paymentStatus) {
      query += `paymentStatus=${paymentStatus}&`;
    }

    return axios
      .get(query.slice(0, -1))
      .then((response) => {
        const data = response.data;

        // Ensure data is an array
        if (Array.isArray(data)) {
          return {
            data: data.map((item) => ({
              id: item._id, // Rename _id to id
              ...item,
            })),
            total: data.length, // Use length of the array as total count
          };
        } else {
          console.error("Invalid response format:", data);
          return { data: [], total: 0 }; // Return empty data if format is incorrect
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        return { data: [], total: 0 }; // Return empty data in case of error
      });
  },

  //get one item in the list
  getOne: async (resource, params) => {
    try {
      const id = params.id;
      const response = await axios.get(`${apiUrl}/${resource}/findOne/${id}`);
      const data = response.data;

      return {
        data: {
          ...data,
          id: data._id,
        },
      };
    } catch (error) {
      console.error(`Error fetching ${resource}`, error);
      throw new Error(`Error fetching ${resource}`);
    }
  },

  //create a new item in the list

  create: async (resource, params) => {
    return await axios
      .post(`${apiUrl}/${resource}/create`, {
        ...params.data,
        _id: params.data.id,
      }) // Map id to _id
      .then((response) => {
        const data = response.data;

        if (!data._id) {
          throw new Error("No ID returned from the server");
        }

        return {
          data: { id: data._id, ...data },
        };
      })
      .catch((error) => {
        console.error("Error creating data:", error);
        return { data: {} }; // Return empty data in case of error
      });
  },

  //update an item in the list

  update: (resource, params) => {
    const url = `${apiUrl}/${resource}/update/${params.id}`;
    return axios
      .put(url, params.data)
      .then((response) => {
        const data = response.data;
        return {
          data: { id: data._id, ...data },
        };
      })
      .catch((error) => {
        console.error("Error updating data:", error);
        return { data: {} }; // Return empty data in case of error
      });
  },

  //delete an item in the list

  delete: (resource, params) => {
    const url = `${apiUrl}/${resource}/delete/${params.id}`;
    return axios
      .delete(url)
      .then((response) => {
        return {
          data: { id: params.id },
        };
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
        return { data: {} }; // Return empty data in case of error
      });
  },
};

export default customDataProvider;
