<?php

namespace NotepadBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

use NotepadBundle\Entity\Category;

class CategoryApiController extends Controller
{
    /**
     * @Route("/api/categories/{id}")
     * @Method("GET")
     */
    function getCategoryAction(Category $category) {
        $serializer = $this->get('serializer');

        if (! $category) {
            return new Response($status=204);
        }
        return new JsonResponse($serializer->serialize($category, 'json'));
    }

    /**
     * @Route("/api/categories/")
     * @Method("GET")
     */
    function getCategoriesAction() {
        $serializer = $this->get('serializer');

        $em = $this->getDoctrine()->getManager();
        $categories = $em->getRepository('NotepadBundle:Category')->findAll();

        return new JsonResponse($serializer->serialize($categories, 'json'));
    }

    /**
     * @Route("/api/categories/")
     * @Method("POST")
     */
    function createCategoryAction(Request $request) {
        $category = new Category();
        return $this->updateCategoryAction($request, $category);
    }

    /**
     * @Route("/api/categories/{id}")
     * @Method("PUT")
     */
    function updateCategoryAction(Request $request, Category $category) {
        $data = json_decode($request->getContent(), true);

        $category->setName($data['name']);

        $em = $this->getDoctrine()->getManager();
        $em->persist($category);
        $em->flush();

        return new Response();
    }

    /**
     * @Route("/api/categories/{id}")
     * @Method("DELETE")
     */
    function deleteCategoryAction(Category $category) {
        $em = $this->getDoctrine()->getEntityManager();
        $em->remove($category);
        $em->flush();

        return new Response();
    }
}
