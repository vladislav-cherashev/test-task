-- Первая таблица: product
CREATE TABLE public.product (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    plu INTEGER
);

-- Вторая таблица: shop
CREATE TABLE public.shop (
    product_id INTEGER REFERENCES public.product(id),
    shop_id INTEGER,
    count_on_shelf INTEGER,
    count_in_order INTEGER,
    CONSTRAINT pk_shop_product_id_shop_id PRIMARY KEY (product_id, shop_id)
);