PGDMP                 	        {            npc-test    15.2    15.2                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            	           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            
           1262    24758    npc-test    DATABASE     ~   CREATE DATABASE "npc-test" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Russian_Russia.1251';
    DROP DATABASE "npc-test";
                postgres    false            �            1259    24759 	   customers    TABLE     �   CREATE TABLE public.customers (
    creation_date date NOT NULL,
    name character varying(100) NOT NULL,
    surname character varying(100),
    email character varying(100) NOT NULL,
    balance numeric(10,0),
    id integer NOT NULL
);
    DROP TABLE public.customers;
       public         heap    postgres    false            �            1259    24821    customers_id_seq    SEQUENCE     �   CREATE SEQUENCE public.customers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.customers_id_seq;
       public          postgres    false    214                       0    0    customers_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.customers_id_seq OWNED BY public.customers.id;
          public          postgres    false    217            �            1259    24766    orders    TABLE     �   CREATE TABLE public.orders (
    items character varying(100)[] NOT NULL,
    purchase_date date NOT NULL,
    total_cost numeric,
    customer_id integer NOT NULL,
    order_id integer NOT NULL
);
    DROP TABLE public.orders;
       public         heap    postgres    false            �            1259    24812    orders_order_id_seq    SEQUENCE     �   CREATE SEQUENCE public.orders_order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 *   DROP SEQUENCE public.orders_order_id_seq;
       public          postgres    false    215                       0    0    orders_order_id_seq    SEQUENCE OWNED BY     K   ALTER SEQUENCE public.orders_order_id_seq OWNED BY public.orders.order_id;
          public          postgres    false    216            j           2604    24836    customers id    DEFAULT     l   ALTER TABLE ONLY public.customers ALTER COLUMN id SET DEFAULT nextval('public.customers_id_seq'::regclass);
 ;   ALTER TABLE public.customers ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    217    214            k           2604    24837    orders order_id    DEFAULT     r   ALTER TABLE ONLY public.orders ALTER COLUMN order_id SET DEFAULT nextval('public.orders_order_id_seq'::regclass);
 >   ALTER TABLE public.orders ALTER COLUMN order_id DROP DEFAULT;
       public          postgres    false    216    215                      0    24759 	   customers 
   TABLE DATA           U   COPY public.customers (creation_date, name, surname, email, balance, id) FROM stdin;
    public          postgres    false    214   y                 0    24766    orders 
   TABLE DATA           Y   COPY public.orders (items, purchase_date, total_cost, customer_id, order_id) FROM stdin;
    public          postgres    false    215                     0    0    customers_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.customers_id_seq', 77, true);
          public          postgres    false    217                       0    0    orders_order_id_seq    SEQUENCE SET     B   SELECT pg_catalog.setval('public.orders_order_id_seq', 1, false);
          public          postgres    false    216            m           2606    24827    customers customers_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.customers DROP CONSTRAINT customers_pkey;
       public            postgres    false    214            q           2606    24820    orders orders_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (order_id);
 <   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_pkey;
       public            postgres    false    215            o           2606    24835    customers uniq_mail 
   CONSTRAINT     O   ALTER TABLE ONLY public.customers
    ADD CONSTRAINT uniq_mail UNIQUE (email);
 =   ALTER TABLE ONLY public.customers DROP CONSTRAINT uniq_mail;
       public            postgres    false    214            r           2606    24829    orders orders_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_fkey FOREIGN KEY (customer_id) REFERENCES public.customers(id) NOT VALID;
 <   ALTER TABLE ONLY public.orders DROP CONSTRAINT orders_fkey;
       public          postgres    false    3181    215    214                 x��W�n#E]���VwU���B6�A�FBVb�Nbw�Wd��a1H��A(db$vH!p~��������nuw`�Ė��w�{J:R�U�R�l�;���=c"���{�+��p��zCȒL��ۭ��`kQ	��e�����wW��L�*�8��ê�xe�.���Z_�З�.<�{}����¯��`k���+kAW��q+g`�`�$�y��o�R_��;}-�adpU�A��"�x0��7A��:�����;p�9DV"�N{�ƭ�'Fܰ#F��п���8q�m�����@�Z�r��^E_@�O����֠�MK^uD�)��"<
������K"�������t���Xz �ө ��K9�<èy��R9#^1�O�q�35�n7��#���	�b��u�~"a	<��x���6��{�%�B��SM;�3LAœ�;��ivL��̨ɋ�@蓨o�f�$��@�����p�V~��*iN*�������Q�tG�/r>nN6ӶK���)�A��wF�c���}���P�Z�4LJ���Qk1�k�8���=:�O�tK��c�x�1��p=�A�tՑ���c�׉�	W��(��?�[�>bB��qky���p������qL�]Yg�rA�s�o {�D외�5�g����F�o�����!�'�&ֵ�M��5�D���?��b7����{��ݵí���T �������]��Sԥ �e4&b�n����w���EǞ�Q<�sp����=�^������,���|ta�y�fIIyŤ42�i�b�a%��g��+M3��⍦��͌�	&�J����}Ј��z�M���Qc*:14Л��
ƶ�Q����!]��v���H��/L�L�ċ,/sc�Os���%��\�r�f��,j��t��jY���2���~@�%]dF_Z�e�ZV�H���xK�m��M�3���ՏpG�U���U�c��ek{�Z��	����b�/EI��Vo��A�p��e��?�GRdi}��'�p����d�N�54ܯ���5�����4��7�\'�����o={�����̅o6��{���4}Q��I�]y|�����b'+�<UzU)�J���i         �   x�uO�
�0>'O!=���K��œl+�����n�:�K|����t��b��01k���|�`jbd5M.�b�����)��/�&�2��
���H=��hͫZ�)�>~�F���l�0u!���X(C����zsYrX�4L*�l�iP�����q�E�;.sI�     